import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext(null)


export const UserProvider = (props) => {
    const [profile, setProfile] = useState(null)
    const history = useHistory()
    useEffect(() => {
        const getProfile = async () => {
            if (localStorage.getItem("token")) {
                const profileFromServer = await fetchProfile(localStorage.getItem("token"))
                setProfile(()=>({...profileFromServer}))
            } else {
                history.push("/login")
            }
        }
        getProfile();
    },[history])

    const fetchProfile = async (token) =>{
        const res = await fetch("http://localhost:5050/api/employee/me", {
            method: 'GET',
            mode : "cors",
            headers: new Headers({  
                "Authorization": 'Bearer '+token,
            }),
        })
        const data = await res.json()
        return data
    }
    

    return <UserContext.Provider value={{profile, setProfile}} {...props}/>
}