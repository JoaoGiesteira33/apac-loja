import React, { useState } from 'react';

import Box from '@mui/system/Box';

import logoApac from '../../assets/LOGO_negrito.png';
import { Divider, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export default function Initial(props) {
    const displayConfig = [
        { xs: 'none', md: 'flex', sm: 'none' },
        { xs: 'none', md: 'none', sm: 'flex' },
        { xs: 'flex', md: 'none', sm: 'none' },
    ];
    const protectedPages = ['login', 'perfil'];
    const protectedPagesLinks = ['/login', '/profile'];

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3),
        textAlign: 'center',
        fontSize: 'clamp(1rem, 3.3vw, 1.3rem)',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        fontWeight: 'bold',
    }));

    function MY_LNK({ link, text }: { link: string; text: string }) {
        return (
            <Link
                className="font-poppins"
                href={link}
                underline="none"
                color={'black'}
                style={{ textShadow: '0px 0px 2px white' }}>
                {text}
            </Link>
        );
    }

    return (
        <Box component="div">
            <img
                src={logoApac}
                className="mr-3 h-28"
                alt="Logo"
                style={{ position: 'absolute', top: 60, left: 60 }}
            />
            <img
                src="https://picsum.photos/2000/1000"
                alt="Hero"
                className="max-h-screen w-full h-full object-cover"
                style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            />

            {/* FULL WIDTH */}
            <Grid
                container
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    paddingBottom: 10,
                    display: displayConfig[0],
                    backgroundColor: 'rgba(128,128,128,0.5)',
                }}>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={2}>
                    <Item>
                        <MY_LNK link="gallery" text="a galeria" />
                    </Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>
                        <MY_LNK link="artists" text="artistas" />
                    </Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>
                        <MY_LNK link="contact" text="contacto" />
                    </Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>
                        <MY_LNK
                            link={protectedPagesLinks[props.loggedIn ? 1 : 0]}
                            text={protectedPages[props.loggedIn ? 1 : 0]}
                        />
                    </Item>
                </Grid>
            </Grid>

            {/* MEDIUM WIDTH */}
            <Grid
                container
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    paddingBottom: 10,
                    display: displayConfig[1],
                }}>
                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <MY_LNK link="gallery" text="a galeria" />
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <MY_LNK link="artists" text="artistas" />
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <MY_LNK link="contact" text="contacto" />
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <MY_LNK
                            link={protectedPagesLinks[props.loggedIn ? 1 : 0]}
                            text={protectedPages[props.loggedIn ? 1 : 0]}
                        />
                    </Item>
                </Grid>
            </Grid>
            {/* SMALL WIDTH */}
            <Grid
                container
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    display: displayConfig[2],
                }}>
                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <MY_LNK link="gallery" text="a galeria" />
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <MY_LNK link="artists" text="artistas" />
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <MY_LNK link="contact" text="contacto" />
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <MY_LNK
                            link={protectedPagesLinks[props.loggedIn ? 1 : 0]}
                            text={protectedPages[props.loggedIn ? 1 : 0]}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
