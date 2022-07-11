import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { KEY_ACCOUNT_STATE } from '../Utilities/Constants'

function PrivateRoute({ children, ...rest }) {
    let location = useLocation();
    
    if (localStorage.getItem(KEY_ACCOUNT_STATE) != null){
        const isLogin = JSON.parse(localStorage.getItem(KEY_ACCOUNT_STATE)).isLogin
        if (isLogin) return children;
        else <Navigate to="/login" state={{ from: location }} replace />;
    }else
        return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
