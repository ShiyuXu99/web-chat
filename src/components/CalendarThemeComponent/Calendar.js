import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import {Box} from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const Calendar = () => {
    return (
       <Box
           display='flex'
           alignItems='center'
           justifyContent='center'
           sx={{ backgroundColor:'white',
           width: '70%',
           maxWidth:'500px',
           minWidth:'300px',
           height:'300px',
           borderRadius:'12px',
           padding:'50px 10px 30px 10px'
       }}>
           <LocalizationProvider dateAdapter={AdapterMoment}>
               <DateCalendar/>
           </LocalizationProvider>
       </Box>
    );
};

export default Calendar;
