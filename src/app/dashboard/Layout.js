import React, {Fragment} from 'react'

import {img_logo, img_symbol_logo} from "../../constants/images"

import "./layout.css"

import {useWindowDimensions} from "../middelwares/responsive"

import {API_URL} from "../../config"

import { useNavigate, Link, useLocation } from "react-router-dom";

import {isAuthenticated} from "../middelwares/helpers"

function Layout({children}) {
    const {width_page} = useWindowDimensions()
    const history = useNavigate()
    const location = useLocation();

    const {user} = isAuthenticated()



    // Method: Signout
    const signout = () => {
        fetch(`${API_URL}/signout`, {
            method :'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(res => {
            if(res.error){
                return
            }

            localStorage.removeItem('jwt-info')
            history('/signin')
        })
        .catch(err => console.error('Error on Server'))
    }

    
  return (
    <div className="container-fluid" style={{height: "100vh"}}>
        <div className="row" style={{height: "100%"}}>
            <div className="col-2 py-2" style={{backgroundColor: "#1c35ea"}}>
                <div className="d-flex justify-content-center">
                    <img src={width_page <= 765 ? img_symbol_logo :  img_logo} width="100%" height="auto" alt="logo_dashboard" />
                </div>
                <div className="d-flex flex-column">
                    {user.role === "ADMIN" ? (
                        <Link 
                            to='/'
                            className={`flex-row p-2 items-center justify-center  rounded my-2 text-center  ${location &&  location.pathname === "/" ? 'bg-green-400' : 'bg-blue-400'}`}
                        >
                            <i className={`bi bi-window`} style={{fontSize: "1rem", color: "white", fontWeight: '500'}}></i>
                            {width_page >= 965 && (
                                <span className="mx-2 text-white font-normal">
                                    All Users    
                                </span>
                            )}
                        </Link>
                    ) : user.role === "SUPER_ADMIN" && (
                        <Fragment>
                            <Link 
                                to="/cities"
                                className={`flex-row p-2 items-center justify-center  rounded my-2 text-center  ${location && (location.pathname === "/cities" || location.pathname === "/cities/create") ? 'bg-green-400' : 'bg-blue-400'}`}
                            >
                                <i className={`bi bi-signpost text-base text-white `}></i>
                                {width_page >= 965 && (
                                    <span className="mx-2 text-white font-normal">
                                        All Cities    
                                    </span>
                                )}
                            </Link> 
                            <Link 
                                to="/streets"
                                className={`flex-row p-2 items-center justify-center  rounded my-2 text-center  ${location && (location.pathname === "/streets" || location.pathname === "/streets/create") ? 'bg-green-400' : 'bg-blue-400'}`}
                            >
                                <i className={`bi bi-signpost-split`} style={{fontSize: "1rem", color: "white", fontWeight: '500'}}></i>
                                {width_page >= 965 && (
                                    <span className="mx-2 text-white font-normal">
                                        All Streets    
                                    </span>
                                )}
                            </Link>      
                        </Fragment>
                        
                    )}
                </div>
            </div> 
            <div className="col-10" style={{backgroundColor: "#FAFBFC"}}>
                <div className="row">
                    <div className="col-12 px-0">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="/">Navbar</Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page"to="/" >Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">Link</Link>
                                        </li>
                                       
                                    </ul>
                                    <form className="d-flex">
                                        <button className="btn btn-outline-success" type="submit" onClick={() => signout()}>Log Out</button>
                                    </form>
                                </div>
                            </div>
                        </nav>    
                    </div>
                </div>
                <div className="row px-2">
                    {children}
                </div>
            </div>   
        </div>
    </div>
  )
}

export default Layout