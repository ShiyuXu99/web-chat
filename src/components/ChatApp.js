import moment from 'moment';
import {useEffect, useRef, useState} from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import {Box, Button, TextField, useTheme} from "@mui/material";
import TextBubble from "./TextBubble";

const textFieldBoxStyle = {
    height:'calc(15vh - 56px)',
    marginTop: '24px',
    padding:'0 16px',
    textAlign:'center',
    justifyContent:'center'
}

const ChatApp = ({userInfo}) => {
    const [message, setMessage] = useState('');
    const formattedDate = moment().format('MMDDYYYY');
    const [prevMessages, setPrevMessages] = useState([]);
    const containerRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        //get previous data
        const fetchData = async () => {
            onSnapshot(doc(db, userInfo?.photoURL, "chatHistory"), (doc) => {
                setPrevMessages(doc.data())
            });
        };
        fetchData();
    }, [userInfo?.photoURL]);

    const addMessage = async () => {
        try {
            const currentMessage = {
                name: userInfo?.displayName,
                messageText: message,
                time: moment().format('LT')
            };

            let data = { ...prevMessages };
            if (!data[formattedDate]) {
                data[formattedDate] = [];
            }
            data[formattedDate].push(currentMessage);
            await setDoc(doc(db, userInfo?.photoURL, "chatHistory"), data);
            setMessage('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [prevMessages]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents newline insertion
            if(message.trim()){
                addMessage();
            }
        }
    };
    return (
        <div>
            <Box
                display="flex"
                flexDirection="column"
                height='100%'
                minWidth='400px'
                sx={{ backgroundColor: theme.palette.background.paper, margin:'16px 0', borderRadius:'16px'}}

            >
                <Box sx={{
                    overflowY: 'auto',
                    height: '85vh',
                    padding: '0 16px',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                        }
                    }}
                     ref={containerRef}
                >
                        {prevMessages && prevMessages[formattedDate]?.map((messageItem) => (
                            <TextBubble
                                messageText={messageItem?.messageText}
                                name={messageItem?.name}
                                time={messageItem?.time}
                                userName={userInfo?.displayName}
                            />
                        ))}
                </Box>

                <Box display='flex' sx={textFieldBoxStyle}>
                        <TextField
                            fullWidth
                            label="输入中..."
                            id="fullWidth"
                            multiline
                            maxRows={4}
                            size={'small'}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            variant="contained" color="primary" size="small" sx={{height: '40px'}}
                            onClick={addMessage}>
                            发送
                        </Button>
                    </Box>

            </Box>

        </div>
    );
};

export default ChatApp;
