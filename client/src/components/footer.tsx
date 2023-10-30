import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Link, List, ListItem } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Hidden from '@mui/material/Hidden';

const Footer = () => {
        return (
                <Box component="div" sx={{ 
                    flexGrow: 1, 
                    backgroundColor: "#f2f2f2"
                    }}>
                    <Grid container spacing={{ xs:1 ,sm: 2, md: 3 }}>
                        <Grid xs={12} sm={12} md={4} display="flex" justifyContent="center" alignItems="center">
                            <List>
                                <h3>Sobre APAC</h3>
                                <ListItem disablePadding> 
                                    <Link href="#" underline="hover">Sobre nós</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Emprego</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Sustentabilidade</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Imprensa</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Publicidade</Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Hidden mdUp>
                        <Grid xs={12} sm={12} md={4}>
                            <Divider variant="middle" />
                        </Grid>
                        </Hidden>
                        <Grid xs={12} sm={12} md={4} display="flex" justifyContent="center" alignItems="center">
                        
                            <List>
                                <h3>Ajuda</h3>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Apoio ao Cliente</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Como funciona</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Vender</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Comprar</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Confiança e Segurança</Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Hidden mdUp>
                            <Grid xs={12} sm={12} >
                                <Divider variant="middle" />
                            </Grid>
                        </Hidden>
                        <Grid xs={12} sm={12} md={4} display="flex" justifyContent="center" alignItems="center">
                            <List>
                                <h3>Legal</h3>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Política de Privacidade</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Termos e Condições</Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link href="#" underline="hover">Livro de Reclamações Online</Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                            <FacebookIcon />
                            <TwitterIcon />
                            <InstagramIcon />
                            <PinterestIcon />
                            <YouTubeIcon />
                            <LinkedInIcon />
                        </Grid>
                        <Grid xs={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                            <List>
                                <span>© 2023 Your Company, Inc. All rights reserved.</span>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
    );
};

export default Footer;