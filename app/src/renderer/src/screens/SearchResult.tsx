import { Button } from '@mui/material';
import { DataGrid, GridColDef} from '@mui/x-data-grid';

import React from 'react';

function SearchResult() {

    const [objects, setObjects] = React.useState<[] | {log_file_key: string}[]>([])
    const [selectedRows , setSelectedRows] = React.useState<number[]>([])

    const handleClick = ()=>{
        const keys = selectedRows.map((row)=>objects[row].log_file_key)
        window.electronAPI.files_download(keys)
    }

    React.useEffect(()=>{
        window.electronAPI.search_response((data:[])=>{
        const rows = data.map((value: any, index)=> ({id: index,...value, log_timestamp: value.log_timestamp.toLocaleDateString(), log_study_date: value.log_study_date.toLocaleDateString()}));
        console.log(rows)
        setObjects(rows);
    })  
      }, [])

    const columns: GridColDef[] = [
        {field: 'log_id', headerName: 'ID', width: 30},
        {field: 'log_timestamp', headerName: 'Upload', width: 100},
        {field: 'log_file_path', headerName: 'Local', width: 300},
        {field: 'log_file_key', headerName: 'Key', width: 400},
        {field: 'log_modality', headerName: 'Modalidade', width: 100},
        {field: 'log_patient_name', headerName: 'Nome', width: 300},
        {field: 'log_patient_id', headerName: 'PacienteId', width: 200},
        {field: 'log_study_date', headerName: 'Data', width: 100},
        {field: 'log_action', headerName: 'Action', width: 100},
        {field: 'log_status', headerName: 'Status', width: 100},
    ]

    return (
        <>
        <DataGrid
            rows={objects}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(rows)=>setSelectedRows(rows as number[])}
            style={{width: '100%'}} 
        />
        <Button variant='contained' style={{marginTop: '10px'}} onClick={handleClick}>Baixar</Button>
        </>

    )
}

export default SearchResult