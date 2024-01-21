import { Outlet, Navigate } from 'react-router-dom';

const SellerPrivateRoutes = (props) => {
    return props.level !== 'client' ? (
        <Outlet />
    ) : (
        <Navigate to="/gallery" replace />
    );
};

export default SellerPrivateRoutes;
