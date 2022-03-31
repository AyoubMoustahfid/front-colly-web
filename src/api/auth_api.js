import {API_URL} from "../config"

export const signin = (data) => {
    return fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    }).then(res => res.json())
}


export const signup = (data) => {
    return fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}