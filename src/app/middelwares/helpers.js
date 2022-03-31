export const isAuthenticated = () => {
    const jwt = localStorage.getItem('jwt-info')
    
    if(jwt){
        return JSON.parse(jwt)
    }

    return false
}