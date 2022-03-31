import React, {useState, useEffect} from 'react'
import Layout from "../dashboard/Layout"

import {API_URL} from "../../config"

import {isAuthenticated} from "../middelwares/helpers"

import {useWindowDimensions} from "../middelwares/responsive"

function Home() {
    const {width_page} = useWindowDimensions()
    const [data, setData] = useState([])
    const [close, setClose] = useState(false)
    const [selectItem, setSelectItem] = useState()
    const [users, setUsers] = useState({
        username: "",
        email: ""
    }) 

    const handleChangeUser = (e) => {
        setUsers({...users, [e.target.id]: e.target.value})
    }

    // Declare state variables for search the table
    const [search, setSearch] = useState("")
    const handleChange = (e) => {
        setSearch(e.target.value);
      };

    useEffect(() => {
        const getAllUsers = () => {
            const {user, token} = isAuthenticated()
            fetch(`${API_URL}/users/${user._id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => res.json())
            .then(res => {
                if(res.error){
                    return
                }

                setData(res.user)
            }).catch(err => console.log('Error on Server'))
        }     
        
        getAllUsers()
    }, [])

    // METHOD: Validation User to Admin
    const validToAdmin = (id) => {
        const {user, token} = isAuthenticated()

        fetch(`${API_URL}/valide_admin/${id}/${user._id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
        .then(res => {
            console.log('responce', res)
            if(res.error){
                return
            }

            window.location.reload()

        }).catch(err => console.log('Error on Server'))
    }

     // METHOD: Validation User to Admin
     const returnToUser = (id) => {
        const {user, token} = isAuthenticated()

        fetch(`${API_URL}/return_user/${id}/${user._id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
        .then(res => {
            console.log('responce', res)
            if(res.error){
                return
            }

            window.location.reload()

        }).catch(err => console.log('Error on Server'))
    }

    // METHOD: Update One User By Id User from the super admin
    const updateOneUser = (e) => {
        e.preventDefault()
        const {user, token} = isAuthenticated()

       fetch(`${API_URL}/user/update/${selectItem._id}/${user._id}`, {
           method: 'PUT',
           headers: {
               "Accept": "application/json",
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
           },
           body : JSON.stringify(users)
       }).then(res => res.json())
       .then(res => {
           if(res.error){
               return
           }

           setUsers({
               username: "",
               email :""
           })

           setClose(true)
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
                    <form action="">
                        <div className="row items-end">
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
                        </div>
                    </form>
                </div>
                <div className="overflow-x-auto relative w-full">
                    
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Email Address</th>
                                <th scope="col">Role</th>
                                <th scope="col">Validation</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(value => value.username.toLowerCase().includes(search.toLowerCase()))
                            .map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>
                                    {item.role === "USER" ? (
                                        <button className="btn bg-blue-600 text-white">Utilisateur</button>
                                    ) : item.role === "ADMIN" ? (
                                        <button className="btn bg-green-400 text-white">Administrateur</button>
                                    ) : item.role === "SUPER_ADMIN" && (
                                        <button className="btn bg-yellow-700 text-white">Supervision</button>
                                    )}
                                    </td>
                                    <td>
                                        {item.role === "USER" ? (
                                            <button className="btn bg-black text-white flex-row justify-center" onClick={() => validToAdmin(item._id)}>
                                                <i className="bi bi-person-check" style={{marginRight: "5px"}}></i>
                                                {width_page >= 817 && (
                                                    <span>Switch Admin</span>
                                                )}
                                            </button>
                                        ) : item.role === "ADMIN" && (
                                            <button className="btn bg-red-400 text-white flex-row justify-center" onClick={() => returnToUser(item._id)}>
                                                <i className="bi bi-person-x" style={{marginRight: "5px"}}></i>
                                                {width_page >= 817 && (
                                                    <span>Reject Admin</span>
                                                )}
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {item.role !== "SUPER_ADMIN" && (
                                            <div>
                                                <button 
                                                    className="btn bg-indigo-600" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#exampleModal"
                                                    onClick={() => setSelectItem(item)}
                                                    >
                                                    <i className="bi bi-pencil-fill text-white"></i>
                                                </button>
                                                <div className={["modal fade", close ? "show" : ""]} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={close}>
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Update User <strong>{selectItem && selectItem.username.toLocaleUpperCase()}</strong></h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form onSubmit={updateOneUser}>
                                                                    <div className="mb-3">
                                                                        <label htmlFor="email" className="form-label">Email address</label>
                                                                        <input 
                                                                            type="email" 
                                                                            className="form-control" 
                                                                            id="email" name="email" 
                                                                            onChange={handleChangeUser}
                                                                            defaultValue={selectItem && selectItem.email}
                                                                             
                                                                            placeholder="Email address"
                                                                             />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label htmlFor="username" className="form-label">User Name</label>
                                                                        <input 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            id="username" name="username"
                                                                            defaultValue={selectItem && selectItem.username}
                                                                            onChange={handleChangeUser}
                                                                             
                                                                            placeholder="Username"
                                                                        />
                                                                    </div>
                                                                    <div className="d-grid gap-2 col-6 mx-auto">
                                                                        <button 
                                                                            type="submit" 
                                                                            className="btn bg-blue-600 text-white" 
                                                                        >
                                                                            Submit
                                                                        </button>    
                                                                    </div>
                                                                </form>
                                                            </div>
                                                       
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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

export default Home