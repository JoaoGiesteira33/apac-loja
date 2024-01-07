import { Grid, Box, Divider, List, ListItem, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../../assets/LOGO.png';
import { useRef, useEffect } from 'react';

const Footer = (props) => {
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
                            <FacebookIcon
                                sx={{ color: COLOR, margin: ICON_MARGIN }}
                            />
                            <InstagramIcon
                                sx={{ color: COLOR, margin: ICON_MARGIN }}
                            />
                            <YouTubeIcon
                                sx={{ color: COLOR, margin: ICON_MARGIN }}
                            />
                            <LinkedInIcon
                                sx={{ color: COLOR, margin: ICON_MARGIN }}
                            />
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
                    <MY_LNK link="#" text="termos e condições" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <MY_LNK link="#" text="suporte" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <MY_LNK link="#" text="política de privacidade" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <Typography color="gray" className="font-poppins">
                        uma iniciativa associação portuguesa das artes e da
                        cultura &copy; {year}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
