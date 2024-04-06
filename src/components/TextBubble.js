import puppyImg from '../assets/img/puppyImg.jpg'
import masterImg from '../assets/img/masterImg.JPG'

import {Box, useTheme} from "@mui/material";
import Avatar from '@mui/material/Avatar';

const bubbleStyle = {
    marginTop: '10px',
};


const bubbleTimeStyle = {
    fontSize: '11px', // Set the font size to tiny
};

const ChatApp = ({name, time, messageText, userName}) => {
    const isUser = name === userName
    const theme = useTheme();
    const bubbleTextStyle = {
        backgroundColor: name === userName? theme.palette.text.background1 : theme.palette.text.background2,
        padding: '10px 16px',
        borderRadius: '8px',
        color: theme.palette.text.secondary
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={isUser ? 'flex-end' : 'flex-start'}
            height={'auto'}
            sx={bubbleStyle}
        >
            <Box display="flex" alignItems="center">
                <span style={bubbleTimeStyle}>{time}</span>
            </Box>
            <Box display="flex" alignItems="center">
                {isUser ? (
                    <>
                        <span style={bubbleTextStyle}>{messageText}</span>
                        <Avatar src={name === 'master'? masterImg : puppyImg} alt="avatar_image" sx={{ ml: 1, borderRadius: '8px' }} />
                    </>
                ) : (
                    <>
                        <Avatar src={name === 'master'? masterImg : puppyImg} alt="avatar_image" sx={{ mr: 1, borderRadius: '8px' }} />
                        <span style={bubbleTextStyle}>{messageText}</span>
                    </>
                )}
            </Box>

        </Box>
    );
};

export default ChatApp;
