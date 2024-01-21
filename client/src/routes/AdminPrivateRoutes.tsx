import { Outlet, Navigate } from 'react-router-dom';

const AdminPrivateRoutes = (props) => {
    return props.level == 'admin' ? (
        <Outlet />
    ) : (
        <Navigate to="/gallery" replace />
    );
};

export default AdminPrivateRoutes;
