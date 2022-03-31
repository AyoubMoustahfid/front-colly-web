import {API_URL} from "../config"
import {isAuthenticated} from "../app/middelwares/helpers"


const {user, token} = isAuthenticated()

export const allStreets = () => {
    return fetch(`${API_URL}/street/${user._id}`,{
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json())
}

export const deleteStreet = (streetId) => {
    return fetch(`${API_URL}/street/delete/${streetId}/${user._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const updateStreet = (streetId, data) => {
    return fetch(`${API_URL}/street/update/${streetId}/${user._id}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export const createStreet = (data) => {
    return fetch(`${API_URL}/street/create/${user._id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}