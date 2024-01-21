import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Grid,
    useTheme,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import logoApac from '../../assets/LOGO_negrito.png';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const pages = ['a galeria', 'artistas', 'contacto'];
const pagesLinks = ['/gallery', '/artists', '/contact'];
const lastpage = ['login', 'perfil'];
const lastpageLinks = ['/login', '/profile'];

const padX = {
    xs: '2rem',
    sm: '4rem',
    md: '6rem',
    lg: '8rem',
};

function ReactNavbar(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [idx, setIdx] = React.useState(0);

    const checkRoute = (route: string, page: string) => {
        const re = RegExp(route);
        return re.test(page);
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                fontSize: '1.2rem',
                backgroundColor: theme.palette.background.default,
            }}>
            <Toolbar disableGutters sx={{ mb: 2, py: 8, paddingX: padX }}>
                <Link to="/">
                    <Box
                        component="img"
                        sx={{
                            content: `url(${logoApac})`,
                            height: { xs: 60, md: 120 },
                        }}
                    />
                </Link>

                <Box
                    component={'div'}
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        textAlign: 'right',
                    }}>
                    <Grid container>
                        {pages.map((page, index) => (
                            <Grid
                                item
                                xs={3}
                                sx={
                                    checkRoute(
                                        pagesLinks[index],
                                        location.pathname
                                    )
                                        ? { fontWeight: 'bold' }
                                        : {}
                                }
                                key={page}>
                                <Link
                                    to={pagesLinks[index]}
                                    className="font-poppins">
                                    {page}
                                </Link>
                            </Grid>
                        ))}
                        <Grid
                            item
                            xs={3}
                            sx={
                                location.pathname ==
                                lastpageLinks[props.loggedIn ? 1 : 0]
                                    ? { fontWeight: 'bold' }
                                    : {}
                            }>
                            <Link
                                to={lastpageLinks[props.loggedIn ? 1 : 0]}
                                className="font-poppins">
                                {lastpage[props.loggedIn ? 1 : 0]}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    component={'div'}
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        onClick={() => {
                            setOpen(!open);
                        }}
                        color="inherit"
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            my: 8,
                            mx: padX,
                        }}>
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Toolbar>
            <Grid
                container
                sx={{
                    display: open ? { xs: 'flex', md: 'none' } : 'none',
                    paddingX: padX,
                }}
                spacing={2}>
                {pages.map((page, index) => (
                    <Grid
                        item
                        xs={12}
                        key={page}
                        sx={{
                            py: 1,
                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        }}
                        className="hover:bg-gray-50">
                        <Link to={pagesLinks[index]} className="font-poppins">
                            <Box
                                component={'div'}
                                sx={
                                    location.pathname == pagesLinks[index]
                                        ? { fontWeight: 'bold' }
                                        : {}
                                }>
                                {page}
                            </Box>
                        </Link>
                    </Grid>
                ))}
                <Grid item xs={12} sx={{ py: 1 }} className="hover:bg-gray-50">
                    <Link
                        to={lastpageLinks[props.loggedIn ? 1 : 0]}
                        className="font-poppins">
                        <Box
                            component={'div'}
                            sx={
                                location.pathname ==
                                lastpageLinks[props.loggedIn ? 1 : 0]
                                    ? { fontWeight: 'bold' }
                                    : {}
                            }>
                            {lastpage[props.loggedIn ? 1 : 0]}
                        </Box>
                    </Link>
                </Grid>
            </Grid>
        </AppBar>
    );
}
export default ReactNavbar;
