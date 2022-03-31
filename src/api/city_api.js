import {API_URL} from "../config"
import {isAuthenticated} from "../app/middelwares/helpers"


export const allCities = () => {
    const {user, token} = isAuthenticated()
    return fetch(`${API_URL}/city/${user._id}`,{
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json())
}

export const deleteCity = (cityId) => {
    const {user, token} = isAuthenticated()
    return fetch(`${API_URL}/city/delete/${cityId}/${user._id}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const updateCity = (cityId, data) => {
    const {user, token} = isAuthenticated()
    return fetch(`${API_URL}/city/update/${cityId}/${user._id}`, {
        method: "PUT",
        headers : {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export const createCity = (data) => {
    const {user, token} = isAuthenticated()
    return fetch(`${API_URL}/city/create/${user._id}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(data)
    }).then(res => res.json())
}