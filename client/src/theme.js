import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
        default: '#121212', // page background
        paper: '#1e1e1e',   // card background
        },
    },
})