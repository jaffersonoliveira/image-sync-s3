import fs from 'fs'

import { getObject, sync, uploadFile } from "../repositories/aws"
import { pathLocalBucket, awsBucket } from "../../config.json"
import { files2Upload } from "./pathService";
import { checkAlreadyExists, post } from '../repositories/model/logModel';

async function syncBucket() {
    sync(pathLocalBucket, `s3://${awsBucket}`);
}

async function saveStreamToFile(stream: any, filePath: string){
    stream.pipe(fs.createWriteStream(filePath));
}

async function getObjectByKey(key: string, path: string){
    const objStream = await getObject(key);
    const filePath = `${path}/${key.split('/').join('-')}`;
    saveStreamToFile(objStream, filePath);
}

async function filesSync(){
    console.log('lendo arquivos a serem enviados');
    const files = files2Upload()
    console.log('iniciando envio');
    for (const file of files) {
        console.log('checando');
        const fileUploaded = await checkAlreadyExists(file.fileKey);
        if (!fileUploaded) {
            console.log('enviando');
            const res = await uploadFile(file.fileKey, file.filePath);
            console.log('guardando');
            post({file_path: file.filePath, file_key: file.fileKey, action: 'post', status: `${res.$metadata.httpStatusCode}`})
        }
    }
    console.log('envio encerrado')
}

export { syncBucket, getObjectByKey, filesSync }