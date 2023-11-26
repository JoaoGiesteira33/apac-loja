import React from 'react';
import { Link } from 'react-router-dom';

import logoApac from '../assets/logo_apac.png';
import logoApacSimplified from '../assets/logo_apac_simplified.png';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'flex',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

const collections = [
    'Pintura',
    'Escultura',
    'Fotografia',
    'Desenho',
    'Colagens',
    'Impressões e Gravuras',
    'Arte Digital',
    'Instalação',
    'Desing',
    'Arte Têxtil',
];

export default function Navbar() {
    const [t, i18n] = useTranslation();
    const [lng, setLng] = React.useState('pt');
    const [drawer, setDrawer] = React.useState(false);

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setDrawer(open);
        };

    const handleChangeLng = (event: SelectChangeEvent) => {
        setLng(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <div className="flex items-center justify-center">
                <img
                    className="max-h-16 place-self-center my-2"
                    alt="logoSimples"
                    src={logoApacSimplified}
                />
            </div>
            <Divider />
            <List>
                {collections.map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <Link to={`/collections/${text}`}>
                                <ListItemText primary={text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div className="grid space-around grow justify-between grid-cols-2 md:grid-cols-[200px_3fr_1fr] md:gap-10">
                        <div className="flex items-center">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor={'left'}
                                open={drawer}
                                onClose={toggleDrawer(false)}>
                                {list()}
                            </Drawer>
                            <Link to="/">
                                <img
                                    className="max-h-16 my-4"
                                    alt="logo"
                                    src={logoApac}
                                />
                            </Link>
                        </div>
                        <div className="flex items-center row-start-2 col-span-2 md:col-span-1 md:row-start-1 md:col-start-2">
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    className="grow"
                                    placeholder={t('navbar.search')}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </div>
                        <div className="flex justify-end items-center">
                            <Link to="/profile">
                                <PersonOutlinedIcon sx={{ fontSize: '2rem' }} />
                            </Link>
                            <ShoppingCartOutlinedIcon
                                sx={{ fontSize: '2rem' }}
                            />
                            <HelpOutlineIcon sx={{ fontSize: '2rem' }} />
                            <FormControl sx={{ fontSize: '2rem' }}>
                                <Select
                                    value={lng}
                                    onChange={handleChangeLng}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'select' }}>
                                    <MenuItem value="pt">PT</MenuItem>
                                    <MenuItem value="en">EN</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
