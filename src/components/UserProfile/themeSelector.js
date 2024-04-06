import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { blueTheme, greenTheme } from '../../assets/theme'; // Import your theme objects

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);

    const handleThemeChange = (event) => {
        const themeName = event.target.value;
        setSelectedTheme(themeName);
        onThemeChange(themeName === 'blue' ? blueTheme : greenTheme);
    };

    return (
        <FormControl component="fieldset">
            <Typography variant="h6" gutterBottom>
                Choose Theme
            </Typography>
            <RadioGroup
                aria-label="theme"
                name="theme"
                value={selectedTheme}
                onChange={handleThemeChange}
                row
            >
                <FormControlLabel
                    value="blue"
                    control={<Radio color="primary" />}
                    label="Blue Theme"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="green"
                    control={<Radio color="primary" />}
                    label="Green Theme"
                    labelPlacement="bottom"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default ThemeSelector;
