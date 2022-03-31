import React, {useState, useEffect} from 'react'
import Layout from "../../../dashboard/Layout"

import {Link} from "react-router-dom"


import toastr from "toastr"
import "toastr/build/toastr.css"

import {allStreets, deleteStreet, updateStreet} from "../../../../api/street_api"

function Streets() {
    const [data, setData] = useState([])

    // Declare state variables for search the table
    const [search, setSearch] = useState("")
    const [selectItem, setSelectItem] = useState()
    const [street, setStreet] = useState({
        name: "",
        code: ""
    })

    // handle change form the update one the street 
    const handleChangeStreet = (e) => {
        setStreet({...street, [e.target.id]: e.target.value})
    }

    // handle change form search 
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    // Get All the Cities
    useEffect(() => {
        allStreets()
        .then(res => {
            if(res.error){
                return
            }

            setData(res.street)
        }).catch(err => console.log('Error on Server'))
    }, [])

    // method the delete one street by id street 
    const deleteOneStreet = (id) => {
       deleteStreet()
        .then(res => {
            toastr.success('Street is deleted Successfully', 'Delete Street', {
                positionClass: "toastr-top-left"
            })
            window.location.reload()
        })
        .catch(err => console.log('Error on Server', err))
    }

    // METHOD: Update one the street by id Super Admin
    const updateOneStreet = (e) => {
        e.preventDefault()

        updateStreet(selectItem._id, street)
        .then(res => {
            if(res.error){
                return 
            }
            console.log('street updated successfully')
            window.location.reload()
        }).catch(err => console.log('Error on Server'))
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
                    <form>
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
                                    <button className="input-group-text" id="basic-addon2">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 col-sm-12 col-md-3 col-lg-2">
                                <div className="flex-row bg-green-400 p-2 rounded">
                                    <i className="bi bi-plus-lg px-2 text-white"></i>
                                    <Link 
                                        className="text-white"
                                        to="/streets/create"
                                        >
                                        Add Street
                                    </Link>  
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
                                <th scope="col">City</th>
                                <th scope="col">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(value => value.name.toLowerCase().includes(search.toLowerCase()))
                            .map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>{item.city.name}</td>
                                    <td>
                                        <div className="flex-row justify-center">
                                            <button 
                                                className="btn bg-black mx-2"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#exampleModal"
                                                onClick={() => setSelectItem(item)}                
                                            >
                                                <i className="bi bi-pencil-fill text-white"></i>
                                            </button>
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Street name <strong>{selectItem && selectItem.name.toLocaleUpperCase()}</strong></h5>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={updateOneStreet}>
                                                                <div className="mb-3">
                                                                    <label htmlFor="name" className="form-label">Name</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        id="name" 
                                                                        name="name"
                                                                        onChange={handleChangeStreet}
                                                                        defaultValue={selectItem && selectItem.name}
                                                                     />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="code" className="form-label">Code</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        id="code" 
                                                                        name="code"
                                                                        onChange={handleChangeStreet}
                                                                        defaultValue={selectItem && selectItem.code}
                                                                     />
                                                                </div>

                                                                <div className="d-grid gap-2 col-6 mx-auto">
                                                                    <button className="btn bg-blue-600 text-white">Update Street</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                className="btn bg-red-500 mx-2"
                                                onClick={() => deleteOneStreet(item._id)}
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

export default Streets