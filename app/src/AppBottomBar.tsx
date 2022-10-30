
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PreviewIcon from '@mui/icons-material/Preview';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SaveIcon from '@mui/icons-material/Save';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function AppBottomBar({
    isActive = false,
    showIsActive = false,
    showAdd = false,
    showSave = false,
    showActivate = false,
    showDeactivate = false,
    handleAddClick = () => {},
    handleSaveClick = () => {},
    handleActiveChange = () => {},
    handlePreviewClick = () => {}
}) {

    return (
        <AppBar
            position="fixed"
            color="text"
            sx={{ px: 0, top: 'auto', bottom: 0 }}
            enableColorOnDark
        >
            <Container maxWidth="fluid">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    {showIsActive && (
                        <>
                            {isActive ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        pr: 4
                                        // backgroundColor: '#eee'
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{ itemItems: 'center' }}
                                    >
                                        Active
                                    </Typography>

                                    <CheckCircleIcon color="success" sx={{ ml: 2 }} />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        pr: 4
                                        // backgroundColor: '#eee'
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{ itemItems: 'center' }}
                                    >
                                        Inactive
                                    </Typography>

                                    <CancelIcon color="error" sx={{ ml: 2 }} />
                                </Box>
                            )}
                        </>
                    )}
                    <Toolbar
                        sx={{
                            justifyContent: 'end'
                        }}
                    >
                        {showAdd && (
                            <Button sx={{ mx: 2 }} variant="contained" onClick={handleAddClick}>
                                Add <AddIcon sx={{ ml: 2 }} />
                            </Button>
                        )}
                        {showSave && (
                            <Button sx={{ mx: 2 }} variant="contained" onClick={handleSaveClick}>
                                Save <SaveIcon sx={{ ml: 2 }} />
                            </Button>
                        )}
                        {showActivate && (
                            <Button sx={{ mx: 2 }} variant="contained" onClick={handleActiveChange}>
                                Activate <PublishedWithChangesIcon sx={{ ml: 2 }} />
                            </Button>
                        )}
                        {showDeactivate && (
                            <Button sx={{ mx: 2 }} variant="contained" onClick={handleActiveChange}>
                                Deactivate <PublishedWithChangesIcon sx={{ ml: 2 }} />
                            </Button>
                        )}

                        {showDeactivate && (
                            <Button sx={{ mx: 2 }} variant="contained" onClick={handlePreviewClick}>
                                Preview <PreviewIcon sx={{ ml: 2 }} />
                            </Button>
                        )}
                    </Toolbar>
                </Box>
            </Container>
        </AppBar>
    );
}
