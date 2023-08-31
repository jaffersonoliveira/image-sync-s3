import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACESSKEYID,
        secretAccessKey: process.env.AWS_SECRETACESSKEY
    }
})

const bucket = process.env.AWS_BUCKET;

async function getObjectURL(key: string) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url
}

async function getObject(key: string) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    })
    const res = await s3Client.send(command)
    return await res.Body.transformToString()
}

export {getObject, getObjectURL}