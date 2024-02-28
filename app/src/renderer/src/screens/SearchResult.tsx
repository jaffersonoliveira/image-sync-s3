import { DataGrid, GridColDef } from '@mui/x-data-grid';

import React from 'react';

function SearchResult() {

    const [objects, setObjects] = React.useState<[] | {Key: string, LastModified: string, StorageClass: string}[]>([])
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
        <DataGrid
        rows={objects}
        columns={columns}
        style={{width: '100%'}}></DataGrid>
    )
}

export default SearchResult