// App.js
import React, {useState} from 'react';
import './App.css';
import ChatApp from './component/ChatApp';
import {Box, FormControlLabel} from "@mui/material";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';


function App() {
    const [selectedValue, setSelectedValue] = useState('puppy');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div style={{width: '100%', heigh:'100%'}}>
            <Box display="flex" width={'100%'} height={'100%'} mt={4}>
                <Box sx={{ width: '100px', paddingLeft: '30px' }}>
                    <FormControl
                        onChange={handleChange}
                    >
                        <FormLabel>Name</FormLabel>
                        <RadioGroup defaultValue="puppy" name="radio-buttons-group">
                            <Radio value={'puppy'} label="puppy" variant="outlined" />
                            <Radio value={'master'} label="master" variant="soft" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box sx={{ flex: 1, height:'100%' }}>
                    <ChatApp userName={selectedValue}/>
                </Box>
            </Box>
        </div>
    );
}

export default App;
