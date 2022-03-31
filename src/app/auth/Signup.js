import React, {useState} from 'react'
import { useNavigate, Link } from "react-router-dom";

import toastr from "toastr"
import "toastr/build/toastr.css"

import {img_symbol_logo} from "../../constants/images"

import {signup} from "../../api/auth_api"

function Signup() {
    const history = useNavigate()

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    // METHOD: Submit form for Create the user account
    const submitSignup= e => {
        e.preventDefault()

        signup(user)
        .then(res => {
            if(res.error){
                toastr.warning(res.error, "Please check form", {
                    positionClass: "toastr-bottom-left"
                })
            }else {
                toastr.info('User is authenticated Successfully', 'Welcom', {
                    positionClass: "toastr-bottom-left"
                })

                history("/signin")
            }
        }).catch(err => toastr.error(err, 'Server error', {
            positionClass: "toastr-bottom-left"
        }))
    }

    // Declare form
    const form = () => (
        <form onSubmit={submitSignup}>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" onChange={handleChange}/>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn bg-blue-600 text-white">Signup</button>
            </div>
            <Link
                to="/signin"
                className="font-bold text-gray-400 text-left text-base"
                >
                Sign In
            </Link>
        </form>
    )


  return (
    <div className="container" style={{height: '100vh'}}>
        <div className="row d-flex flex-column justify-content-center" style={{height: "100%"}}>
            <div className="col-12 col-sm-12 col-md-5 mx-auto">
                <div className="pb-2 d-flex flex-column align-items-center">
                    <img style={{ height: "100px"}} src={img_symbol_logo} alt="img_login"/>
                    <h1 className="text-2xl font-semibold">Création de compte</h1>
                    <p className="text-base font-medium">Entrez vos données</p>
                </div>
                {form()}
            </div>
        </div>
    </div>
  )
}

export default Signup