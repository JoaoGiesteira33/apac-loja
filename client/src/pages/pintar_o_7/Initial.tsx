import { useEffect, useState } from 'react';

import {
    Box,
    CircularProgress,
    Divider,
    Grid,
    Link,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import logoApac from '../../assets/LOGO_negrito.png';
import { checkLink } from '../../fetchers';

import useProductSearch from '../../hooks/useProductSearch';

export default function Initial(props: { loggedIn: boolean }) {
    const [t] = useTranslation();
    const theme = useTheme();

    const displayConfig = [
        { xs: 'none', md: 'flex', sm: 'none' },
        { xs: 'none', md: 'none', sm: 'flex' },
        { xs: 'flex', md: 'none', sm: 'none' },
    ];
    const protectedPages = [t('initial.login'), t('initial.profile')];
    const protectedPagesLinks = ['/login', '/profile'];

    const Item = styled(Box)(() => ({
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        textAlign: 'center',
        fontSize: 'clamp(1rem, 3.3vw, 1.3rem)',
        boxShadow: 'none',
        fontWeight: 'bold',
        backgroundColor: theme.palette.background.default,
    }));

    function MY_LNK({ link, text }: { link: string; text: string }) {
        return (
            <Box
                component={Link}
                className="font-poppins"
                href={link}
                underline="none"
                color={theme.palette.text.primary}>
                {text}
            </Box>
        );
    }

    const [productQuery] = useState({
        featured: true,
        limit: 100,
    });
    const [productPage] = useState(1);

    const { products, loading, error } = useProductSearch(
        productQuery,
        productPage
    );

    // get one random product
    const [randomProduct, setRandomProduct] = useState(null);

    useEffect(() => {
        if (products && products.length > 0) {
            setRandomProduct(
                products[Math.floor(Math.random() * products.length)]
            );
        }
    }, [products]);

    return (
        <Box component="div">
            <img
                src={logoApac}
                className="mr-3 h-28"
                alt="Logo"
                style={{ position: 'absolute', top: 60, left: 60 }}
            />
            {randomProduct && (
                <img
                    src={checkLink(randomProduct.photos[0])}
                    alt="Hero"
                    className="max-h-screen w-full h-full object-cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                    }}
                />
            )}
            {error && <Box>{error}</Box>}
            {loading && (
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginY: '2rem',
                    }}>
                    <CircularProgress />
                </Box>
            )}

            {/* FULL WIDTH */}
            <Grid
                container
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    paddingBottom: 10,
                    display: displayConfig[0],
                    backgroundColor: theme.palette.background.default,
                }}>
                <Grid xs={12}>
                    <Divider />
                </Grid>
                <Grid xs={4} />
                <Grid xs={2}>
                    <Item>
                        <MY_LNK link="gallery" text={t('initial.gallery')} />
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <MY_LNK link="artists" text={t('initial.artists')} />
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <MY_LNK link="contact" text={t('initial.contact')} />
                    </Item>
                </Grid>
                <Grid xs={2}>
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
                    backgroundColor: theme.palette.background.default,
                }}>
                <Grid xs={12}>
                    <Divider variant="middle" />
                </Grid>
                <Grid xs={3}>
                    <Item>
                        <MY_LNK link="gallery" text={t('initial.gallery')} />
                    </Item>
                </Grid>
                <Grid xs={3}>
                    <Item>
                        <MY_LNK link="artists" text={t('initial.artists')} />
                    </Item>
                </Grid>
                <Grid xs={3}>
                    <Item>
                        <MY_LNK link="contact" text={t('initial.contact')} />
                    </Item>
                </Grid>
                <Grid xs={3}>
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
                    backgroundColor: theme.palette.background.default,
                }}>
                <Grid xs={12}>
                    <Divider variant="middle" />
                </Grid>
                <Grid xs={12}>
                    <Item>
                        <MY_LNK link="gallery" text={t('initial.gallery')} />
                    </Item>
                </Grid>
                <Grid xs={12}>
                    <Item>
                        <MY_LNK link="artists" text={t('initial.artists')} />
                    </Item>
                </Grid>
                <Grid xs={12}>
                    <Item>
                        <MY_LNK link="contact" text={t('initial.contact')} />
                    </Item>
                </Grid>
                <Grid xs={12}>
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
