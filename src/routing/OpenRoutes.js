import { Navigate } from 'react-router-dom';

export const OpenRoutes = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("customer"))
    return user?.token === undefined ? children : (<Navigate to='/' replace={true}/>)
};

