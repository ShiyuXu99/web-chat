import {Box, useTheme} from "@mui/material";
import ChatApp from "../components/ChatApp";
import CalendarTheme from "../components/CalendarThemeComponent/CalendarTheme";
import UserProfile from "../components/UserProfile/UserProfile";

const MainPage = ({userInfo, setCurrentTheme}) => {
    const theme = useTheme();

    return (
        <div style={{height: '100%', width:'100%', backgroundColor: theme.palette.background.default}}>
            <Box id="mainPage" style={{ width:'100%'}} height={'100%'} display="flex" flexWrap='wrap' flexDirection="row" gap={2} >
                <Box width='20%' sx={{minWidth: '300px'}}>
                        <UserProfile userInfo={userInfo} setCurrentTheme={setCurrentTheme}/>
                </Box>
                <Box width='40%'
                     minWidth='400px'
                     maxWidth='700px'
                     maxHeight={'100%'}
                >
                    <ChatApp userInfo={userInfo}/>
                </Box>
                <Box flex={1}
                >
                    <CalendarTheme userInfo={userInfo}/>
                </Box>
            </Box>
        </div>
    );
}

export default MainPage;
