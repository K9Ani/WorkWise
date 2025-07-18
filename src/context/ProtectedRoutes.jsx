import React, { useContext } from 'react'
import { UserContext } from './AuthUserContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    let {isLoggedIn} = useContext(UserContext);

 if(!isLoggedIn) {
    return <Navigate to="/login"/>
 } else {
    return <>{children}</>
 }
}

export default ProtectedRoutes