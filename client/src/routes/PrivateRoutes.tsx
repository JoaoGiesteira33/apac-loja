import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = (props) => {
    return props.level ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
