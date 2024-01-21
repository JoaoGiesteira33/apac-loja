import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProfileThumbnail from '../../components/Profile/ProfileThumbnail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';

export default function ProfileIndex(props) {
    const [t] = useTranslation();
    const theme = useTheme();
    const { level } = props;

    return (
        <Box
            component={'div'}
            sx={{
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '8rem',
                },
                paddingY: '3rem',
                display: 'flex',
                justifyContent: 'center',
            }}>
            <div className="grid max-w-max max-h-max gap-2 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center content-center items-center">
                <Link className="inline-block" to="/profile/info">
                    <ProfileThumbnail
                        title={t('profile.account.title')}
                        description={t('profile.account.description')}
                        icon={<AccountCircleIcon />}
                    />
                </Link>
                {/* CLIENT ONLY THUMBNAILS */}
                {//level == 'client' && (
                    <Link className="inline-block" to="/profile/order-history">
                        <ProfileThumbnail
                            title={t('profile.order_history')}
                            description={t('profile.order_history_text')}
                            icon={<HistoryIcon />}
                        />
                    </Link>
                //)
                }
                {/* SELLER ONLY THUMBNAILS */}
                {//level == 'seller' && (
                    <Link className="inline-block" to="/profile/products">
                        <ProfileThumbnail
                            title={t('profile.products')}
                            description={t('profile.products_text')}
                            icon={<PhotoAlbumIcon />}
                        />
                    </Link>
                //)
                }
                {//level == 'seller' && (
                <Link className="inline-block" to="/artists/add">
                    <ProfileThumbnail
                        title={t('profile.new-seller')}
                        description={t('profile.new-seller-text')}
                        icon={<PersonAddIcon />}
                    />
                </Link>
                //)
                }
                {/* ADMIN ONLY THUMBNAILS */}
                {//level == 'admin' && (
                    <Link className="inline-block" to="/dashboard">
                        <ProfileThumbnail
                            title={t('profile.dashboard')}
                            description={t('profile.dashboard_text')}
                            icon={<DashboardIcon />}
                        />
                    </Link>
                //)
                }
                <Link
                    className="inline-block"
                    to="/login"
                    onClick={() => {
                        localStorage.removeItem('loggedIn');
                        localStorage.removeItem('user');
                        props.setLoggedIn(null);
                    }}>
                    <ProfileThumbnail
                        title={t('profile.logout')}
                        description={t('profile.logout_text')}
                        icon={<LogoutIcon />}
                    />
                </Link>
            </div>
        </Box>
    );
}
