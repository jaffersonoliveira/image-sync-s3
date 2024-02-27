import { Pool } from'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dicom_sync',
  password: 'postgres',
  port: 5432,
});

const query =  (text: string, params?: any) => pool.query(text, params)

export {
  query
}