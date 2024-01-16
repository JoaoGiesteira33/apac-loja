import { Grid, Box, Divider, List, ListItem, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../../assets/LOGO.png';
import { useRef, useEffect } from 'react';

const Footer = (props) => {
    const navigate = useNavigate();
    const COLOR = 'gray';
    const ICON_MARGIN = 0.5;
    const year = new Date().getFullYear();

    function MY_LNK({ link, text }: { link: string; text: string }) {
        return (
            <Link className="font-poppins" color={COLOR} to={link}>
                {text}
            </Link>
        );
    }

    return (
        <Box
            component="div"
            sx={{
                flexGrow: 1,
                paddingBottom: 5,
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '8rem',
                },
            }}>
            <Grid container sx={{ paddingBottom: 5 }}>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={3}
                    md={3}
                    lg={2}
                    display="flex"
                    justifyContent="left"
                    alignItems="center">
                    <List>
                        <ListItem sx={{ paddingX: 0 }}>
                            <img
                                className="max-h-16 my-4"
                                alt="logo"
                                src={logo}
                            />
                        </ListItem>
                        <ListItem sx={{ paddingX: 0 }}>
                            {/*<a
                                target="_blank"
                                href={
                                    'https://www.facebook.com/associacaoportuguesartecultura'
                                }>
                                <FacebookIcon
                                    sx={{ color: COLOR, margin: ICON_MARGIN }}
                                />
                            </a>*/}

                            <a
                                target="_blank"
                                href={
                                    'https://www.instagram.com/galeriapintaro7/'
                                }>
                                <InstagramIcon
                                    sx={{ color: COLOR, margin: ICON_MARGIN }}
                                />
                            </a>

                            {/*<a
                                target="_blank"
                                href={
                                    'https://associacaoportuguesaartesecultura.pt/projetos/'
                                }>
                                <YouTubeIcon
                                    sx={{ color: COLOR, margin: ICON_MARGIN }}
                                />
                            </a>

                            <a
                                target="_blank"
                                href={
                                    'https://associacaoportuguesaartesecultura.pt/projetos/'
                                }>
                                <LinkedInIcon
                                    sx={{ color: COLOR, margin: ICON_MARGIN }}
                                />
                            </a>*/}
                        </ListItem>
                    </List>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={5}
                    md={5}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <List>
                        <ListItem disablePadding sx={{ paddingBottom: 2 }}>
                            <Typography color="gray" className="font-poppins">
                                menu
                            </Typography>
                        </ListItem>
                        <ListItem disablePadding>
                            <MY_LNK link="gallery" text="a galeria" />
                        </ListItem>
                        <ListItem disablePadding>
                            <MY_LNK link="artists" text="artistas" />
                        </ListItem>
                        <ListItem disablePadding>
                            <MY_LNK link="contact" text="contacto" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <MY_LNK link="terms&conditions" text="termos e condições" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <MY_LNK link="#" text="livro de reclamações" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <MY_LNK
                        link="privacy_policy"
                        text="política de privacidade"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <a
                        target="_blank"
                        href={'https://associacaoportuguesaartesecultura.pt/'}>
                        <Typography
                            color="gray"
                            sx={{ textDecoration: 'underline' }}>
                            uma iniciativa associação portuguesa das artes e da
                            cultura &copy; {year}
                        </Typography>
                    </a>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
