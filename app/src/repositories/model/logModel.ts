import * as db from "../postgres";

async function getAll() {
    const res = await db.query('select * from log')
    return res.rows
}

async function checkAlreadyExists(key: string) {
    const res = await db.query(`select count(*) > 0 exist from log where log_file_key=$1`, [key]);
    return res.rows[0].exist
}

interface IPost {
    file_path: string, 
    file_key: string, 
    action: string, 
    status: string,  
    modality: string,
    patient_name: string,
    patient_id: string,
    study_date: string
}
async function post(values: IPost) {
    console.log(values);
    const stringQuery = `insert into log(log_timestamp, log_file_path, log_file_key, log_action, log_status, log_modality, log_patient_name, log_patient_id, log_study_date) values (now(),$1,$2,$3,$4, $5, $6, $7, $8) returning *`;
    const res = await db.query(stringQuery, Object.values(values))
    return res.rows
}

interface ISearch {study_date?: string, modality?: string, patient_id?: string, patient_name?: string}
async function search(search: ISearch) {

    function makeWhere(filter: string, index: number) {
        const prefix_table = 'log_'
        const logic = filter === 'patient_name' ? ` ilike $${index+1}` : ` = $${index+1}`
        return prefix_table + filter + logic
    }

    if (Object.keys(search).length > 0) {
        console.log(Object.values(search))
        const filterNames = Object.keys(search)
        const where = 'where ' + filterNames.map(makeWhere).join(' and ');
        const stringQuery = `select * from log ${where}`;
        console.log(stringQuery)
        const res = await db.query(stringQuery, Object.values(search))
        return res.rows
    } 
}

export { getAll, post, checkAlreadyExists, search, ISearch }