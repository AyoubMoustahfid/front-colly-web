import React, {useState, useEffect} from 'react'
import Layout from "../../../dashboard/Layout"
import {Link} from "react-router-dom"

import toastr from "toastr"
import "toastr/build/toastr.css"

import {allCities, deleteCity, updateCity} from "../../../../api/city_api"


function Cities() {


    const [data, setData] = useState([])
    const [city, setCity] = useState({
        name: "",
        code: ""
    })
    const [element, setElement] = useState()

    // Declare state variables for search the table
    const [search, setSearch] = useState("")
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle Change event the name City
        const handleChangeCity = (e) => {
            setCity(city);
        } 
        
    
    // Get All the Cities
    useEffect(() => {
        allCities().then(res => {
            if(res.error){
                return
            }

            setData(res.city)
        }).catch(err => console.log('Error on Server', err))
        
    }, [])

        // method the delete one city by id city 
        const deleteOneCity = (id) => {
    
            deleteCity(id)
            .then(res => {
                toastr.success('Street is deleted Successfully', 'Delete Street', {
                    positionClass: "toastr-top-left"
                })
                window.location.reload()
            })
            .catch(err => console.log('Error on Server', err))
        }

        // method update one city by id City from the admin
        
        const updateOneCity = () => {
            updateCity(element._id, city)
            .then(res => {
                console.log('res', res)
                if(res.error){
                    toastr.error('City is not update', 'Error Update', {
                        positionClass: "toastr-top-left"
                    })
                    return 
                }

                toastr.success('City is updated Successfully', `Update ${city.name}`, {
                    positionClass: "toastr-top-left"
                })
                
                window.location.reload()
            }).catch(err => console.log('Error on Server', err))

        }

  return (
    <Layout>
        <div className="col-12">
            <div className="row py-4">
                <div className="col-6">
                    <h3 className="text-2xl font-semibold">Dashboard</h3>
                </div>
                <div className="col-6"></div>
            </div>
           <div className="shadow-lg bg-white p-3 rounded ">
                <div className="py-2">
                    <form action="">
                        <div className="row items-center justify-between">
                            <div className="col-12 col-sm-12 col-md-4">
                                <label htmlFor="basic-url" className="form-label">Filter Name</label>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Recipient's username" 
                                        aria-label="Recipient's username" 
                                        aria-describedby="basic-addon2"
                                        value={search}
                                        id="search"
                                        name="search"
                                        onChange={handleChange}

                                    />
                                    <button 
                                        className="input-group-text" 
                                        id="basic-addon2"
                                        
                                        >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 col-sm-12 col-md-3 col-lg-2">
                                <div className="flex-row bg-green-400 p-2 rounded">
                                    <i className="bi bi-plus-lg px-2 text-white"></i>
                                    <Link className="text-white" to="/cities/create">Add City</Link>  
                                </div>  
                            </div>
                        </div>
                    </form>
                </div>
                <div className="overflow-x-auto relative w-full">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Code</th>
                                <th scope="col">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(value => value.name.toLowerCase().includes(search.toLowerCase()))
                            .map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>
                                        <div className="flex-row justify-center">
                                            <button 
                                                type="button"
                                                className="btn bg-black mx-2"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#exampleModal" 
                                                data-bs-whatever="@getbootstrap"  
                                                onClick={() => setElement(item)}    
                                            >
                                                <i className="bi bi-pencil-fill text-white"></i>
                                            </button>
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={updateOneCity}>
                                                            <div className="mb-3">
                                                                <label 
                                                                    htmlFor="name" 
                                                                    className="col-form-label">
                                                                    Name:
                                                                </label>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    id="name"
                                                                    name="name"
                                                                    defaultValue={element && element.name}
                                                                    onChange={handleChangeCity}
                                                                />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label 
                                                                    htmlFor="code" 
                                                                    className="col-form-label">
                                                                    Name:
                                                                </label>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    id="code"
                                                                    name="code"
                                                                    defaultValue={element && element.code}
                                                                    onChange={handleChangeCity}
                                                                />
                                                            </div>

                                                            <div className="d-grid">
                                                                <button 
                                                                    className="btn bg-blue-600 text-white font-semibold" 
                                                                    type="button"
                                                                    onClick={updateOneCity}
                                                                    >
                                                                    UPDATE
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    
                                                    </div>
                                                </div>
                                                </div>
                                            <button 
                                                className="btn bg-red-500 mx-2"
                                                onClick={() => deleteOneCity(item._id)}
                                            >
                                                <i className="bi bi-trash text-white"></i>
                                            </button>    
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        
                        </tbody>
                    </table>           
                </div>
                
           </div>
        </div>
    </Layout>
  )
}

export default Cities