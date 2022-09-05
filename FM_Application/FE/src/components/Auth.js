import { useLocation,Navigate } from "react-router-dom"

export const setToken = (token,role)=>{

    sessionStorage.setItem('user', token)// make up your own token
    sessionStorage.setItem('Role', role)
}

export const fetchToken = (token)=>{

    return sessionStorage.getItem('user')
    
}


export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return <Navigate to='/' state ={{from : location}}/>;
    }
    
    return children;
}