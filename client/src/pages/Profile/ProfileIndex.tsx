import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import ProfileThumbnail from '../../components/Profile/ProfileThumbnail';
import { useTranslation } from 'react-i18next';

export default function ProfileIndex(props) {
    const [t] = useTranslation();
    return (
        <div className="p-8 flex items-center justify-center">
            <div className="grid max-w-max max-h-max gap-2 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center content-center items-center">
                <Link className="inline-block" to="/profile/info">
                    <ProfileThumbnail
                        title={t('profile.account.title')}
                        description={t('profile.account.description')}
                        icon={<AccountCircleIcon />}
                    />
                </Link>
                <Link className="inline-block" to="/profile/order-history">
                    <ProfileThumbnail
                        title={t('profile.order_history')}
                        description={t('profile.order_history_text')}
                        icon={<HistoryIcon />}
                    />
                </Link>
                <Link className="inline-block" to="/profile/products">
                    <ProfileThumbnail
                        title={t('profile.products')}
                        description={t('profile.products_text')}
                        icon={<PhotoAlbumIcon />}
                    />
                </Link>
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
        </div>
    );
}
