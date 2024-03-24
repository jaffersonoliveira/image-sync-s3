
import dicomParser from "dicom-parser";
import { readFileSync } from "fs";

function extractFileName (path: string) {
    const dicomData = readFileSync(path); //"/home/jafferson/Downloads/2017/09/23/11/65E90CCD/5A820849/E06ADAEE"
    const dataSet = dicomParser.parseDicom(dicomData);
    const patientName = dataSet.string('x00100010');
    const patientId = dataSet.string('x00100020');
    const modality = dataSet.string('00080060');
    const date = dataSet.string('x00080020');
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6);
    //const id = dataSet.string('x00080018');
    const fileName = `${year}${month}${day}_${patientId}_${modality}_${patientName}`;
    return fileName;
}

export { extractFileName }
