import { ThemeOptions, createTheme } from '@mui/material/styles';
import { blueGrey, red } from '@mui/material/colors'

const themeOpt: ThemeOptions = {
    palette: {
        error: { main: red.A400 },
        primary: { main: blueGrey[900] },
        secondary: {main: red[500]}
    }
}

const theme = createTheme(themeOpt)

export default theme;