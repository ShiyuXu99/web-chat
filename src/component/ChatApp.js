import { collection, addDoc } from "firebase/firestore";
import moment from 'moment';
import {useEffect, useState} from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import {Box, Button, FormControl, OutlinedInput, TextField} from "@mui/material";
import TextBubble from "./TextBubble";

const ChatApp = ({userName}) => {
    const [message, setMessage] = useState('');
    const formattedDate = moment().format('MMDDYYYY');
    const [prevMessages, setPrevMessages] = useState([]);

    const addMessage = async () => {
        try {
            let data = {} ;
            const currentMessage = {
                name: userName,
                messageText: message,
                time: moment().format('LT')
            }
            if(!prevMessages || Object.keys(prevMessages).length === 0){
                data = {today: [currentMessage]}
            }
            else{
                const originalData = prevMessages['today']
                originalData.push(currentMessage)
                data['today'] = originalData
            }

            await setDoc(doc(db, "dates", formattedDate), data);
            setMessage('')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            onSnapshot(doc(db, "dates", formattedDate), (doc) => {
                setPrevMessages(doc.data())
            });
        };
        fetchData();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents newline insertion
            addMessage();
        }
    };
    return (
            <Box
                sx={{
                    maxWidth: '600px',
                    minWidth: '300px',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <Box sx={{
                    textAlign: 'center',
                    overflowY: 'auto',
                    maxHeight: '80vh',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}>
                        {prevMessages?.today?.map((messageItem) => (
                            <TextBubble
                                messageText={messageItem?.messageText}
                                name={messageItem?.name}
                                time={messageItem?.time}
                                userName={userName}
                           />
                        ))}
                </Box>
                <Box mt={2} sx={{ display: 'flex',  textAlign: 'center', justifyContent:'center', height:'40px' }}>
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
                    variant="outlined" size="small"
                    onClick={addMessage}>Send</Button>
                </Box>
            </Box>
    );
};

export default ChatApp;
