import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Component/Loading';
import { AuthContext } from '../Provider/AuthProvider';

const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children
    }

    return (
        <div>
            <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
        </div>
    );
};

export default PrivetRoute;