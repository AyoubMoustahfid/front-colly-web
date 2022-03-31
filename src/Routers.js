import React from 'react'
import { Routes, Route,  BrowserRouter as Router } from "react-router-dom";

// import All Components
import Signin from "./app/auth/Signin"
import Signup from "./app/auth/Signup"
import Home from "./app/core/Home"
import Cities from "./app/dashboard/admin/city/Cities"
import Streets from "./app/dashboard/admin/street/Streets"
import CreateCity from "./app/dashboard/admin/city/CreateCity"
import CreateStreet from "./app/dashboard/admin/street/CreateStreet"



// import Private Route
import PrivateRoute from "./app/middelwares/PrivateRoute"


function Routers() {
  return (
    <Router>
        <Routes>
            <Route
                path="/"
                exact
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route path='/signin' exact element={<Signin/>} />
            <Route path='/signup' exact element={<Signup/>} />

            <Route 
                path="/cities" exact 
                element={<PrivateRoute><Cities/></PrivateRoute>} 
            />
            <Route 
                path="/streets" exact 
                element={<PrivateRoute><Streets/></PrivateRoute>} 
            />
            <Route 
                path="/cities/create" exact 
                element={<PrivateRoute><CreateCity/></PrivateRoute>} 
            />
            <Route 
                path="/streets/create" exact 
                element={<PrivateRoute><CreateStreet/></PrivateRoute>}
            />
        </Routes>
    </Router>
  )
}

export default Routers