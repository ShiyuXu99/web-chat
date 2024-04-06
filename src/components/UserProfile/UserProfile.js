import * as React from 'react';
import {Box, Button, useTheme} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import masterImg from "../../assets/img/masterImg.JPG";
import puppyImg from "../../assets/img/puppyImg.jpg";
import {getAuth, signOut} from "firebase/auth";


const UserProfile = ({userInfo}) => {
    const theme = useTheme();
    return (
        <Box
            display='flex'
            // alignItems='center'
            justifyContent='center'
            sx={{
                width: '100%',
                height:'100vh',
                borderRadius:'12px',
            }}>
            <Box display='flex'
                 flexDirection='column'
                 alignItems='center'
                 justifyContent='flex-end'
                 sx={{
                     width: '100%',
                     height:'50vh',
                 }}>
                <Box >
                    <Avatar src={userInfo?.displayName === 'master'? masterImg : puppyImg} alt="avatar_image"
                            sx={{ width:'100px', height:'100px', borderRadius: '100px', border: `3px solid ${theme.palette.primary.main}`}}
                    />
                </Box>
                <Box>
                    <h3>{userInfo?.displayName}</h3>
                </Box>
                <Box mt={3}>
                    <Button
                        color="primary"
                        variant="outlined"
                        size='small'
                        sx={{fontSize: '12px'}}
                        onClick={ async () => {
                            const auth = getAuth();
                            await signOut(auth)
                        }}>
                        Log Out
                    </Button>
                </Box>
            </Box>

        </Box>
    );
};

export default UserProfile;
