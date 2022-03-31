import React from 'react'
import { Navigate} from "react-router-dom"
import {isAuthenticated} from "./helpers"

function PrivateRoute({children}) {
    return isAuthenticated() ? children : <Navigate to="/signin" />;
}

export default PrivateRoute