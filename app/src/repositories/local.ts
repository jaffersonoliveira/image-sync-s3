import { readdirSync, statSync } from "fs";
import path from "path";

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

export { filesList }