import { getObject, sync } from "../repositories/aws"
import { pathLocalBucket, awsBucket } from "../../config.json"
import fs from 'fs'

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

export { syncBucket, getObjectByKey }