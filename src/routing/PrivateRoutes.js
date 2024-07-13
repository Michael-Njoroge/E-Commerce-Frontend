import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("customer"))
    return user?.token !== undefined ? children : (<Navigate to='/login' replace={true}/>)
};

