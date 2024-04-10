import { readdirSync, statSync } from "fs";
import { pathLocalBucket } from "../../config.json";
import path from "path";
import { extractFileName } from "./dicomService";

function filesList(dirPath: string, resFiles?: string[]) {
    resFiles = resFiles || [];
    const files = readdirSync(dirPath);

    files.forEach(function(file) {
        const filepath = path.join(dirPath, file);

        if (statSync(filepath).isDirectory()) {
            filesList(filepath, resFiles);
        } else {
            resFiles.push(filepath);
        }
    });

    return resFiles;
}

/* function files2Upload() {
    const files = filesList(pathLocalBucket);
    const res: {fileKey: string, filePath: string}[] = [];
    for(const file of files) {
        const fileName = extractFileName(file);
        res.push({fileKey: fileName, filePath: file})
    }
    return res
} */

export { filesList,  }