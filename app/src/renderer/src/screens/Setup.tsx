import { Button, Grid, TextField, Typography} from "@mui/material";
import { useForm } from 'react-hook-form'
import config from "../../../../config.json"

function Setup() {
  const { register, handleSubmit } = useForm({ defaultValues: config })
  const onSubmit = (data)=> console.log(data)
  return (
    <>
      <Typography variant="h5" fontWeight='700'>Configurações</Typography>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Grid container spacing={3} p={2}>
          {
            Object.entries(config).map((entrie) => (
              <Grid item xs={6}>
                <TextField {...register(entrie[0])} label={entrie[0]} required fullWidth variant="standard" error={false} />
              </Grid>
            ))
          }
        </Grid>
        <Button variant="contained" color="secondary" type="submit" >Salvar</Button>
      </form>
    </>
  )
}

export default Setup;