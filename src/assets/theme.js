import { createTheme } from '@mui/material/styles';

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#5876B6',
            contrastText: '#fff',
        },
        secondary: {
            main: '#5876B6', // Example secondary color
        },
        text: {
            //chat box text color
            primary: '#171717', // Example text color
            secondary: '#ffffff',
            //chat box text background
            background1: '#40645e',
            background2: '#46616e'
        },
        background: {
            default: '#B7C7D4', // Default background color
            paper: '#ffffff', // Background color for paper-like elements
        },
    },
});

export const greenTheme = createTheme({
    palette: {
        primary: {
            main: '#586F45',
            light: '#D4D8CA', // Lighter variant
            contrastText: '#fff',
        },
        secondary: {
            main: '#586F45', // Example secondary color
        },
        text: {
            primary: '#171717', // Example text color
            secondary: '#2c2c2c',
            background1: '#CDD8CA',
            background2: '#CAD4D8'
        },
        background: {
            default: '#D4D8CA', // Default background color
            paper: '#ffffff', // Background color for paper-like elements
        },
        // components: {
        //     MuiButton: {
        //         styleOverrides: {
        //             containedPrimary: {
        //                 backgroundColor: '#586F45',
        //                 color: '#fff',
        //                 '&:hover': {
        //                     backgroundColor: 'red', // Darker color on hover
        //                 },
        //             },
        //         },
        //     },
        // },
    },
});

