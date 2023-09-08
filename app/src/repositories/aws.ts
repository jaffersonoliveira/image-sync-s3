import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
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

async function getObjectURL(key: string) {
    const command = new GetObjectCommand({
      Bucket: awsBucket,
      Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url
}

async function getObject(key: string) {
    const command = new GetObjectCommand({
        Bucket: awsBucket,
        Key: key
    })
    const res = await s3Client.send(command)
    return await res.Body.transformToString()
}

export {getObject, getObjectURL, sync, awsBucket}