import { Button } from '@mui/material';
import { DataGrid, GridColDef} from '@mui/x-data-grid';

import React from 'react';

function SearchResult() {

    const [objects, setObjects] = React.useState<[] | {Key: string, LastModified: string, StorageClass: string}[]>([])
    const [selectedRows , setSelectedRows] = React.useState<number[]>([])

    const handleClick = ()=>{
        const keys = selectedRows.map((row)=>objects[row].Key)
        window.electronAPI.files_download(keys)
    }

    React.useEffect(()=>{
        window.electronAPI.search_response((data:[])=>{
        const rows = data.map((value: any, index)=> ({id: index, ...value}));
        setObjects(rows);
    })  
      }, [])

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 30},
        {field: 'Key', headerName: 'Chave', width: 600},
        {field: 'LastModified', headerName: 'Modifcação', width: 200},
        {field: 'ETag', headerName: 'ETag', width: 400},
        {field: 'Size', headerName: 'Tamanho', width: 200},
        {field: 'StorageClass', headerName: 'StorageClass', width: 200},
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