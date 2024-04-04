// App.js
import React from 'react';
import './App.css';
import ChatApp from './component/ChatApp';

function App() {
    return (
        <div>
            <h1>Welcome to My Chat Page</h1>
            <ChatApp /> {/* Render the ChatApp component */}
        </div>
    );
}

export default App;
