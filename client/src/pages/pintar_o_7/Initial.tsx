import React, { useState } from 'react';


import Box from '@mui/system/Box';

import logoApac from '../../assets/LOGO_negrito.png';
import { Divider, Grid, List, ListItem, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export default function Initial() {
    const COLOR = 'gray';

    const displayConfig = [
        {xs: "none", md: "flex", sm: "none"},
        {xs: "none", md: "none", sm: "flex"},
        {xs: "flex", md: "none", sm: "none"},
    ]

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
                color={"black"}
                >
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
            <Grid container sx={{position: "absolute", bottom: 0, paddingBottom: 10, display: displayConfig[0]}}>
                <Grid xs={12}>
                    <Divider variant="middle" /> 
                </Grid>
                <Grid xs={4}>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <MY_LNK link="gallery" text="a galeria" />
                    </Item>
                </Grid>
                <Grid xs={2}>
                        <Item>
                            <MY_LNK link="artists" text="artistas" />
                        </Item>
                </Grid>
                <Grid xs={2}>
                        <Item>
                            <MY_LNK link="contact" text="contacto" />
                        </Item>
                </Grid>
                <Grid xs={2}>
                        <Item>
                            <MY_LNK link="login" text="login" />
                        </Item>
                </Grid>
            </Grid>
            
            {/* MEDIUM WIDTH */}
            <Grid container sx={{position: "absolute", bottom: 0, paddingBottom: 10, display: displayConfig[1]}}>
                <Grid xs={12}>
                    <Divider variant="middle" /> 
                </Grid>
                <Grid xs={3}>
                    <Item>
                        <MY_LNK link="gallery" text="a galeria" />
                    </Item>
                </Grid>
                <Grid xs={3}>
                        <Item>
                            <MY_LNK link="artists" text="artistas" />
                        </Item>
                </Grid>
                <Grid xs={3}>
                        <Item>
                            <MY_LNK link="contact" text="contacto" />
                        </Item>
                </Grid>
                <Grid xs={3}>
                        <Item>
                            <MY_LNK link="login" text="login" />
                        </Item>
                </Grid>
            </Grid>
            {/* SMALL WIDTH */}
            <Grid container sx={{position: "absolute", bottom: 0, display: displayConfig[2]}}>
                <Grid xs={12}>
                    <Divider variant="middle" /> 
                </Grid>
                <Grid xs={12}>
                    <Item>
                        <MY_LNK link="gallery" text="a galeria" />
                    </Item>
                </Grid>
                <Grid xs={12}>
                        <Item>
                            <MY_LNK link="artists" text="artistas" />
                        </Item>
                </Grid>
                <Grid xs={12}>
                        <Item>
                            <MY_LNK link="contact" text="contacto" />
                        </Item>
                </Grid>
                <Grid xs={12}>
                        <Item>
                            <MY_LNK link="login" text="login" />
                        </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
