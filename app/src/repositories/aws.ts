import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { GlacierClient } from '@aws-sdk/client-glacier'
import { createReadStream} from "fs";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3SyncClient } from "s3-sync-client"
import archiver from 'archiver';
import stream from 'stream';

import { awsBucket, awsRegion, awsAcessKeyId, awsSecretAcessKey } from'../../config.json'

const s3Client = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAcessKeyId,
        secretAccessKey: awsSecretAcessKey
    }
})

const glacierClient = new GlacierClient({
  region: awsRegion,
  credentials: {
      accessKeyId: awsAcessKeyId,
      secretAccessKey: awsSecretAcessKey
  }
})

const { sync } = new S3SyncClient({client: s3Client })

async function search(text: string){
  const command = new ListObjectsV2Command({Bucket: awsBucket, Prefix: text});
  const res = await s3Client.send(command)
  return res.Contents
}

async function uploadZipDir(fileKey: string, filePath: string) {
  console.log('carregando aquivo')
  const archive = archiver('zip', { zlib: { level: 9 } });
  const passThroughStream = new stream.PassThrough();
  const uploadParams = {
    Bucket: awsBucket,
    Key: fileKey, 
    Body: passThroughStream,
  };  

  // Pipe do archiver para o stream pass-through
  archive.pipe(passThroughStream);

  // Adiciona a pasta ao arquivo (com o conteúdo da pasta)
  archive.directory(filePath, false);

  // Finaliza a criação do arquivo, o que significa que
  // não serão mais arquivos adicionados ao arquivo.
  archive.finalize();

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

export {getObject, getObjectURL, sync, uploadFile, search} 