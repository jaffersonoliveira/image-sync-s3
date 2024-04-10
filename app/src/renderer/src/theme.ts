import { ThemeOptions, createTheme } from '@mui/material/styles';
import { blueGrey, red, grey } from '@mui/material/colors'

const themeOpt: ThemeOptions = {
    palette: {
        error: { main: red.A400 },
        primary: { main: blueGrey[900] },
        secondary: {main: red[500]},
    },
    components: {
        MuiSelect:{
            defaultProps: {
                style: {backgroundColor: blueGrey[700], borderRadius: 10}
            }
        },
        MuiTextField: {
            defaultProps:{
                style:{backgroundColor: blueGrey[700], borderRadius: 10},
            }
        }
    }
}

const theme = createTheme(themeOpt)

export default theme;