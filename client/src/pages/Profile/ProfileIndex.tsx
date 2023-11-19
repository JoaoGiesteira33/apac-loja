import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ProfileThumbnail from '../../components/Profile/ProfileThumbnail';

export default function ProfileIndex() {
    return (
        <div className="grid">
            <Link to="/profile/info">
                <ProfileThumbnail
                    title="Info"
                    description="Check profile info."
                    icon={<AccountCircleIcon />}
                />
            </Link>
            <Link to="/profile/orderHistory">
                <ProfileThumbnail
                    title="Order History"
                    description="Check your order history"
                    icon={<AccountCircleIcon />}
                />
            </Link>
        </div>
    );
}
