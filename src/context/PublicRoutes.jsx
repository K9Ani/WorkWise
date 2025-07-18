import React, { useContext } from 'react'
import { UserContext } from './AuthUserContext'
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({children}) => {
    let {isLoggedIn} = useContext(UserContext);
    console.log(isLoggedIn)

 if(isLoggedIn) {
    return <Navigate to="/"/>
 } else {
    return <>{children}</>
 }
}

export default PublicRoutes