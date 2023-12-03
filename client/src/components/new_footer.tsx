import { Grid, Box, Divider, Link, List, ListItem, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../assets/LOGO.png';
import "@fontsource/poppins";

const Footer = () => {

        const COLOR = "gray"
        const ICON_MARGIN = 0.5

        function MY_LNK ({link, text} : {link: string, text: string}) {
            return (
                <Link href={link} color={COLOR} underline="none" fontFamily="Poppins">{text}</Link>
            );
        }

        return (
                <Box component="div" sx={{ 
                    flexGrow: 1, 
                    backgroundColor: "white"
                    }}>
                    
                    <Grid container >
                        <Grid xs={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid xs={6} sm={3} md={3} lg={2} display="flex" justifyContent="center" alignItems="center">
                            <List>
                                <ListItem>
                                    <img
                                        className="max-h-16 my-4"
                                        alt="logo"
                                        src={logo}
                                    />
                                </ListItem>
                                <ListItem>
                                    <FacebookIcon sx={{color: COLOR, margin: ICON_MARGIN}} />
                                    <InstagramIcon sx={{color: COLOR, margin: ICON_MARGIN}} />
                                    <YouTubeIcon sx={{color: COLOR, margin: ICON_MARGIN}} />
                                    <LinkedInIcon sx={{color: COLOR, margin: ICON_MARGIN}} />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid xs={6} sm={5} md={5} display="flex" justifyContent="center" alignItems="center">
                        
                            <List>
                                <ListItem disablePadding sx={{paddingBottom: 2}}>
                                    <Typography color="gray" fontFamily="Poppins">menu</Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <MY_LNK link="#" text="a galeria"/>
                                </ListItem>
                                <ListItem disablePadding>
                                    <MY_LNK link="#" text="artistas"/>
                                </ListItem>
                                <ListItem disablePadding>
                                    <MY_LNK link="#" text="contacto"/>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={12} md={3} lg={2} display="flex" alignItems="center" justifyContent="center">
                            <MY_LNK link="#" text="termos e condições"/>
                        </Grid>
                        <Grid xs={12} md={3} lg={2} display="flex" alignItems="center" justifyContent="center">
                            <MY_LNK link="#" text="suporte"/>
                        </Grid>
                        <Grid xs={12} md={3} lg={2} display="flex" alignItems="center" justifyContent="center">
                            <MY_LNK link="#" text="política de privacidade"/>
                        </Grid>
                        <Grid xs={12} md={3} lg={6} display="flex" alignItems="center" justifyContent="center">
                            <Typography color="gray" fontFamily="Poppins">uma iniciativa associação portuguesa das artes e da cultura © 2023</Typography>
                        </Grid>
                    </Grid>
                </Box>
    );
};

export default Footer;