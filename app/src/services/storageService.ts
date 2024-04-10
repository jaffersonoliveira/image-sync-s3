import fs from 'fs'
import { filesList } from '../services/pathService';
import { extractFileName } from './dicomService';
import { uploadZipDir , getObject, sync, uploadFile } from '../repositories/aws';
import { checkAlreadyExists, post, search } from '../repositories/model/logModel';

import { pathLocalBucket, awsBucket } from "../../config.json"

async function syncBucket() {
    sync(pathLocalBucket, `s3://${awsBucket}`);
}

/* async function saveStreamToFile(stream: any, filePath: string){
    await stream.pipe(fs.createWriteStream(filePath)); 
} */

async function saveStreamToFile(stream: any, filePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const fileWriteStream = fs.createWriteStream(filePath);
        stream.pipe(fileWriteStream);
        fileWriteStream.on('finish', () => {
            resolve();
        });
        fileWriteStream.on('error', (err) => {
            reject(err);
        });
    });
}

async function getObjectByKey(key: string, path: string){
    const objStream = await getObject(key);
    const filePath = path//`${path}/${key.split('/').join('-')}`;
    await saveStreamToFile(objStream, filePath);
    return Promise.resolve();
}

async function filesSync(){
    const caminhoBase = pathLocalBucket
    const dias = fs.readdirSync(caminhoBase);
    for (const dia of dias){
        const exames = fs.readdirSync(caminhoBase+dia)
        for (const exame of exames) {
            const primeiroArquivo = filesList(caminhoBase+dia+'/'+exame)[0]
            const metadadosArquivo = extractFileName(primeiroArquivo)
            const nomeArquivo = metadadosArquivo.fileName
            const caminhoPasta = caminhoBase + dia + '/' + exame
            console.log(caminhoPasta, ' - ', nomeArquivo)
            const fileUploaded = await checkAlreadyExists(nomeArquivo);
            if (!fileUploaded) {
                const res = await uploadZipDir(nomeArquivo, caminhoPasta)
                await post({
                    file_path: caminhoPasta, 
                    file_key: nomeArquivo, 
                    action: 'post', 
                    status: `${res.$metadata.httpStatusCode}`,
                    modality: metadadosArquivo.modality,
                    patient_name: metadadosArquivo.patientName,
                    patient_id: metadadosArquivo.patientId,
                    study_date: metadadosArquivo.date,
                })
            }
        }
    }
}

export { syncBucket, getObjectByKey, filesSync }