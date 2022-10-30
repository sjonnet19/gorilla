import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export default function AppSnackBar() {
    const showSnackbar = false;
    const message = '';
    const severity = 'success';

    const handleClose = () => {
    };

    return (
        <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}
