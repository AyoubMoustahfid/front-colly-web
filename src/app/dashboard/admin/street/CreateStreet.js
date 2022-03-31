import React, {useState, useEffect} from 'react'
import Layout from "../../../dashboard/Layout"

import {useNavigate} from "react-router-dom"

import {allCities} from "../../../../api/city_api"
import {createStreet} from "../../../../api/street_api"

function CreateStreet() {
  const history = useNavigate()
  
  // Declare state variables
  const [cities, setCities] = useState([])

  const [street, setStreet] = useState({
    name: "",
    code: ""
  })

  // handle Change value form
  const handleChange = e => {
    setStreet({...street, [e.target.id]: e.target.value})
  }


  // get all the cities by id admin
    useEffect(() => {
      allCities()
        .then(res => setCities(res.city))
        .catch(err => console.log('Error on Server'))
    }, [])

    // Method: Create The Street by id admin
    const createOneStreet = (e) => {
      e.preventDefault()
      createStreet(street)
      .then(res => {
        if(res.error){
          return
        }

        setStreet({
          name: "",
          code: "",
          city: 0
        })
        history('/streets')
      }).catch(err => console.log('Error on Server'))
    }



  return (
    <Layout>
        <div className="col-6 mx-auto">
          <form onSubmit={createOneStreet}>
            <h1 className="mb-4 text-3xl font-semibold">Create Street</h1>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                name="name"
                onChange={handleChange}
                value={street.name}
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
                value={street.code}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <select className="form-select" name="city" id="city" onChange={handleChange} value={street.city}>
                  <option value="0">Open this select menu</option>
                  {cities && cities.map((city, i) => (
                    <option key={i} value={city._id}>{city.name}</option>
                  ))}
                </select>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button 
                className="btn bg-blue-600 text-white" 
                type="button"
       
                >
                  Create City
              </button>
            </div>
          </form>
        </div>
    </Layout>
  )
}

export default CreateStreet