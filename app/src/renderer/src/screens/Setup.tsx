import { Button, FormControl, FormLabel, Input, Typography } from "@mui/material";
import config from "../../../../config.json"

function Setup() {
  return (
    <>
      <FormControl>
        <FormLabel><Typography variant="h5" fontWeight='700'>Configurações</Typography></FormLabel>
        {Object.entries(config).map((entrie) => <Input placeholder={entrie[0]} />)}
        <Button variant="contained">Salvar</Button>
      </FormControl>
    </>
  )
}

export default Setup;