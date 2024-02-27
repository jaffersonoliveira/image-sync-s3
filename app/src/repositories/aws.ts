import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { createReadStream} from "fs";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3SyncClient } from "s3-sync-client"

import { awsBucket, awsRegion, awsAcessKeyId, awsSecretAcessKey } from'../../config.json'

const s3Client = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAcessKeyId,
        secretAccessKey: awsSecretAcessKey
    }
})

const { sync } = new S3SyncClient({client: s3Client })

async function uploadFile(fileKey: string, filePath: string) {
    console.log('carregando aquivo')
    const fileStream = createReadStream(filePath); 
    const uploadParams = {
      Bucket: awsBucket,
      Key: fileKey, 
      Body: fileStream,
    };
  
    try {
    console.log('enviando aquivo')  
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      console.log("Success", data);
      return data; 
    } catch (err) {
      console.log("Error", err);
      throw new Error("Failed to upload file:" + err);
    }
  }

async function getObjectURL(key: string) {
    const command = new GetObjectCommand({
      Bucket: awsBucket,
      Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    console.log(url)
    return url
}

async function getObject(key: string) {
    const command = new GetObjectCommand({
        Bucket: awsBucket,
        Key: key
    })
    const res = await s3Client.send(command)
    return res.Body
}

export {getObject, getObjectURL, sync, uploadFile}