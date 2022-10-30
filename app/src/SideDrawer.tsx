

import { Link, ListItemButton } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import StorefrontIcon from '@mui/icons-material/Storefront';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function SideDrawer(props: any) {
    const { window, setActiveView } = props

    const drawerWidth = 240
    const isOpen = false
    const variant = 'permanent'

    const handleClick = (activeView: string) => {
        setActiveView && setActiveView(activeView)
    };

    const drawerContent = (
        <div>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    IFD
                </Typography>
            </Toolbar>

            <Divider />
            <List>
               
                <Link href="#" onClick={() => handleClick('students')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Students'} />
                    </ListItemButton>
                </Link>

                <Link href="#" onClick={() => handleClick('classes')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Classes'} />
                    </ListItemButton>
                </Link>

            </List>
        </div>
    );

    const container =
        window !== undefined && variant !== 'permanent' ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="nav"
        >
            <Drawer
                container={container}
                variant={variant}
                open={isOpen}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
