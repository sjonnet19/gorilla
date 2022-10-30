import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';


export default function AppBackdrop() {
    const showBackdrop = false;
    
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showBackdrop}
        >
            <CircularProgress />
        </Backdrop>
    );
}
