import React, {useState} from 'react'

import { useNavigate, Link } from "react-router-dom";

import toastr from "toastr"
import "toastr/build/toastr.css"

import {img_symbol_logo} from "../../constants/images"
import {signin} from "../../api/auth_api"

const Signin = () => {
    const history = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    const submitSignin = e => {
        e.preventDefault()

        signin(user)
        .then(res => {
            if(res.error){
                toastr.warning(res.error, "Please check form", {
                    positionClass: "toastr-bottom-left"
                })
            }else {
                toastr.info('User is authenticated Successfully', 'Welcom', {
                    positionClass: "toastr-bottom-left"
                })

                localStorage.setItem('jwt-info', JSON.stringify(res))
                if(res.user.role === "ADMIN"){
                    history("/")
                }else if(res.user.role === "SUPER_ADMIN"){
                    history("/cities")
                }
            }
        }).catch(err => toastr.error(err, 'Server error', {
            positionClass: "toastr-bottom-left"
        }))
    }

  return (
    <div className="container" style={{height: '100vh'}}>
        <div className="row d-flex flex-column justify-content-center" style={{height: "100%"}}>
            <div className="col-12 col-sm-12 col-md-5 mx-auto">
                <div className="pb-2 d-flex flex-column align-items-center">
                    <img style={{ height: "100px"}} src={img_symbol_logo} alt="img_login"/>
                    <h1 className="text-2xl font-semibold">Connexion</h1>
                    <p className="text-base font-medium">Entrez vos identifiants</p>
                </div>
                <form onSubmit={submitSignin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange}/>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn bg-blue-600 text-white">Signin</button>
                    </div>

                    <Link
                        to="/signup"
                        className="font-bold text-gray-400 text-left text-base"
                        >
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signin