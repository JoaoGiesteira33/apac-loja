import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import ProfileThumbnail from '../../components/Profile/ProfileThumbnail';

export default function ProfileIndex(props) {
    return (
        <div className="p-8 flex items-center justify-center">
            <div className="grid max-w-max max-h-max gap-2 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center content-center items-center">
                <Link className="inline-block" to="/profile/info">
                    <ProfileThumbnail
                        title="Info"
                        description="Check profile info."
                        icon={<AccountCircleIcon />}
                    />
                </Link>
                <Link className="inline-block" to="/profile/order-history">
                    <ProfileThumbnail
                        title="Order History"
                        description="Check your order history"
                        icon={<HistoryIcon />}
                    />
                </Link>
                <Link className="inline-block" to="/profile/products">
                    <ProfileThumbnail
                        title="My Products"
                        description="Manage your products"
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
                        title="Sair"
                        description="Sair da conta"
                        icon={<LogoutIcon />}
                    />
                </Link>
            </div>
        </div>
    );
}
