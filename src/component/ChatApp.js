// In ChatApp.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = io('https://shiyuxu99.github.io/web-chat/'); // Update with your server URL

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages, socket]);

    const handleMessageSend = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <span>{msg}</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleMessageSend}>Send</button>
        </div>
    );
};

export default ChatApp;
