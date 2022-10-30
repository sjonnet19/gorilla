import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function AppTopBar() {

    return (
        <AppBar position="fixed" color="text" sx={{ px: 0 }} enableColorOnDark>
            <Toolbar>
                
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    
                </Typography>

            </Toolbar>
        </AppBar>
    );
}
