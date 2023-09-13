import { Button, Grid, TextField, Typography } from "@mui/material";
import config from "../../../../config.json"

function Setup() {
  return (
    <>
        <Typography variant="h5" fontWeight='700'>Configurações</Typography>
        <Grid container spacing={3} p={2}>
          {
            Object.entries(config).map((entrie) => (
              <Grid item xs={6}>
                <TextField label={entrie[0]} required fullWidth value={entrie[1]} variant="standard" />
              </Grid>
            ))
          }
        </Grid>
        <Button variant="contained">Salvar</Button>
    </>
  )
}

export default Setup;