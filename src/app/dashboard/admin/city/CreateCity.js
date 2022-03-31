import React, {useState} from 'react'
import Layout from "../../../dashboard/Layout"

import {useNavigate} from "react-router-dom"

import {API_URL} from "../../../../config"

import {isAuthenticated} from "../../../middelwares/helpers"


function CreateCity() {

  const history = useNavigate()

  const [city, setCity] = useState({
      name: "",
      code: ""
  })

  
  const handleChange = (e) => {
    setCity({...city, [e.target.id]: e.target.value})
  }
   

  // Method: Create the cities by id the admin
    const createCity = () => {
      const {user, token} = isAuthenticated()
      fetch(`${API_URL}/city/create/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(city)
      }).then(res => res.json())
      .then(res => {
        if(res.error){
          return
        }

        setCity({
          name: "",
          code: ""
        })

        history('/cities')

        console.log('Create City is successfully')
      }).catch(err => console.log('Error on Server'))
    }
  


  return (
    <Layout>
        <div className="col-6 mx-auto">
          <form onSubmit={createCity}>
            <h1 className="mb-4 text-3xl font-semibold">Create City</h1>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                name="name"
                onChange={handleChange}
                />
            </div>

            <div className="mb-3">
              <label htmlFor="code" className="form-label">Code</label>
              <input 
                type="text" 
                className="form-control" 
                id="code" 
                name="code"
                onChange={handleChange}
                />
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button 
                className="btn bg-blue-600 text-white" 
                type="button"
                onClick={createCity}
                >
                  Create City
              </button>
            </div>
          </form>
        </div>
    </Layout>
  )
}

export default CreateCity