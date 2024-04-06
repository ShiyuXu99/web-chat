import {Box} from "@mui/material";
import Calendar from "./Calendar";


const CalendarTheme = () => {

    return (
        <Box display="flex" flexDirection="column" maxHeight={'100%'}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                 sx={{
                     height: '40vh',
                     marginTop: '10vh',
                     width: '100%',
                 }}
            >
                <Calendar/>
            </Box>
        </Box>
    );
};

export default CalendarTheme;
