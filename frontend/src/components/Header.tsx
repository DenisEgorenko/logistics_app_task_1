import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    IconButton,
    Button,
    Drawer,
    List,
    ListItemButton,
    useMediaQuery
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

const navItems = [
    { label: 'Админка', path: '/admin' }
];

export default function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Левая часть */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography variant="h5" component="div">
                            Logistics App
                        </Typography>

                        {!isMobile && navItems.map(({ label, path }) => (
                            <Button
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={{
                                    color: 'inherit',
                                    textTransform: 'none',
                                    fontSize: "18px",
                                    '&.active': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                    }
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Box>

                    {/* Правая часть */}
                    <Box>
                        {!isMobile && (
                            <IconButton color="inherit" component={NavLink} to="/settings">
                                <SettingsIcon />
                            </IconButton>
                        )}
                        {isMobile && (
                            <>
                                <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
                                    <MenuIcon />
                                </IconButton>
                                <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                                    <Box sx={{ width: 200 }}>
                                        <List>
                                            {navItems.map(({ label, path }) => (
                                                <ListItemButton
                                                    key={path}
                                                    component={NavLink}
                                                    to={path}
                                                    onClick={() => setOpenDrawer(false)}
                                                    sx={{
                                                        '&.active': {
                                                            backgroundColor: theme.palette.action.selected
                                                        }
                                                    }}
                                                >
                                                    {label}
                                                </ListItemButton>
                                            ))}
                                            <ListItemButton
                                                component={NavLink}
                                                to="/settings"
                                                onClick={() => setOpenDrawer(false)}
                                                sx={{
                                                    '&.active': {
                                                        backgroundColor: theme.palette.action.selected
                                                    }
                                                }}
                                            >
                                                Настройки
                                            </ListItemButton>
                                        </List>
                                    </Box>
                                </Drawer>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}