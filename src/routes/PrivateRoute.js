import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";

export const PrivateRoute = () => {
    const {isAuthenticated} = useSelector(state => state.auth);
    console.log(isAuthenticated)

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
        //<Outlet/>
    )
}
