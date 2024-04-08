import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MainPage from "./page/mainPage";
import SignInPage from "./page/SignIn";
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import {ThemeProvider} from "@mui/material/styles";
import {greenTheme} from "./assets/theme";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTheme, setCurrentTheme] = useState(greenTheme);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <CircularProgress />; // Display loading indicator while waiting for authentication state
    }

    return (
        <ThemeProvider theme={currentTheme}>
            <Routes>
                <Route path="/" element={user ? <MainPage userInfo={user} setCurrentTheme={setCurrentTheme}/> : <SignInPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
