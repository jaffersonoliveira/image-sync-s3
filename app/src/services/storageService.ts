import { sync } from "../repositories/aws"
import { pathLocalBucket, awsBucket } from "../../config.json"

async function syncBucket() {
    sync(pathLocalBucket, `s3://${awsBucket}`)
}


export { syncBucket }