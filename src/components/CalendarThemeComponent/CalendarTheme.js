import {Box} from "@mui/material";
import Calendar from "./Calendar";
import TodoList from "./TodoList";


const CalendarTheme = ({userInfo}) => {

    return (
        <Box display="flex" flexDirection="column" maxHeight={'100%'}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                 sx={{
                     height: '30vh',
                     marginTop: '15vh',
                     width: '100%',
                 }}
            >
                <Calendar/>
            </Box>
            <Box
                display='flex'
                justifyContent='center'
                sx={{
                    height: '40vh',
                    marginTop: '5vh',
                    width: '100%',
                }}
            >
        <TodoList userInfo={userInfo}/>
            </Box>
        </Box>
    );
};

export default CalendarTheme;
