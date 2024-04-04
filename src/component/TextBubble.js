import puppyImg from '../img/puppyImg.jpg'
import masterImg from '../img/masterImg.JPG'

import {Box, Button, FormControl, OutlinedInput, TextField} from "@mui/material";
import {Avatar} from "@mui/joy";

const bubbleStyle = {
    marginTop: '10px',
};

const bubblePuppyTextStyle = {
    backgroundColor: '#dbecff',
    padding: '10px 16px',
    // border: '1px solid', // Specify 'solid' for the border style
    // borderColor: '#c1cbd7', // Set the border color
    borderRadius: '8px'
};

const bubbleTextStyle = {
    backgroundColor: '#ffeedb',
    padding: '10px 16px',
    // border: '1px solid', // Specify 'solid' for the border style
    // borderColor: '#c1cbd7', // Set the border color
    borderRadius: '8px'
};


const bubbleTimeStyle = {
    fontSize: '10px', // Set the font size to tiny
};

const ChatApp = ({name, time, messageText, userName}) => {
    const isUser = name === userName

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
                        <span style={name === 'master'? bubbleTextStyle : bubblePuppyTextStyle}>{messageText}</span>
                        <Avatar src={name === 'master'? masterImg : puppyImg} alt="avatar_image" sx={{ ml: 1, borderRadius: '8px' }} />
                    </>
                ) : (
                    <>
                        <Avatar src={name === 'master'? masterImg : puppyImg} alt="avatar_image" sx={{ mr: 1, borderRadius: '8px' }} />
                        <span style={name === 'master'? bubbleTextStyle : bubblePuppyTextStyle}>{messageText}</span>
                    </>
                )}
            </Box>

        </Box>
    );
};

export default ChatApp;
