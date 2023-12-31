import React, { useState } from 'react';


import Box from '@mui/system/Box';

import logoApac from '../../assets/LOGO_negrito.png';
import { Divider, Grid, List, ListItem, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export default function Initial() {
    const COLOR = 'gray';

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3),
        textAlign: 'center',
        fontSize: '24px',
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
                className="mr-3 h-9 md:h-28 sm:h-9"
                alt="Logo"
                style={{ position: 'absolute', top: 60, left: 60 }}
            />
            <img
                    src="https://picsum.photos/2000/1000"
                    alt="Hero"
                    className="max-h-screen w-full h-full object-cover"
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            />
            <Grid container sx={{position: "absolute", bottom: 0, paddingBottom: 10}}>
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
        </Box>
    );
}
