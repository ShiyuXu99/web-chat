import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import {Box} from "@mui/material";
import { getAuth, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roomKey, setRoomKey] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: email.split('@')[0],
                photoURL: roomKey
            })
        } catch (error) {
            // const errorCode = error.code;
            // const errorMessage = error.message;
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Set the container height to viewport height
            }}
        >
            <form onSubmit={handleSubmit}
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      maxWidth: '300px',
                      alignItems: 'center',
                  }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Sign In
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    size='small'

                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    size='small'

                    required
                />
                <TextField
                    fullWidth
                    label="Room Key"
                    type="text"
                    value={roomKey}
                    onChange={(e) => setRoomKey(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    size='small'
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ marginTop: '1rem' }}
                >
                    Sign In
                </Button>
            </form>
        </Box>
    );
}

export default SignInPage;
