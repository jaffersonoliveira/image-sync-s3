import * as db from "../postgres";

async function getAll() {
    const res = await db.query('select * from log')
    return res.rows
}

async function checkAlreadyExists(key: string) {
    const res = await db.query(`select count(*) > 0 exist from log where log_file_key=$1`, [key]);
    return res.rows[0].exist
}

async function post(values: {file_path: string, file_key: string, action: string, status: string}) {
    const stringQuery = `insert into log(log_timestamp, log_file_path, log_file_key, log_action, log_status) values (now(),$1,$2,$3,$4) returning *`;
    const res = await db.query(stringQuery, Object.values(values))
    return res.rows
}

export { getAll, post, checkAlreadyExists }