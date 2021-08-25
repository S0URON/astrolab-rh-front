import { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { io } from 'socket.io-client'


export const UserContext = createContext(null)
export const HolidayContext = createContext(null)
export const SocketContext = createContext(null)

export const UserProvider = (props) => {
    const [profile, setProfile] = useState(null)
    const history = useHistory()
    useEffect(() => {
        const getProfile = async () => {
            if (localStorage.getItem("token")) {
                const profileFromServer = await fetchProfile(localStorage.getItem("token"))
                setProfile(() => ({ ...profileFromServer }))
            } else {
                history.push("/login")
            }
        }
        getProfile();
    }, [history])

    const fetchProfile = async (token) => {
        const res = await fetch("https://astro-rh-back.herokuapp.com/api/employee/me", {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                "Authorization": 'Bearer ' + token,
            }),
        })
        const data = await res.json()
        return data
    }

    return <UserContext.Provider value={{ profile, setProfile }} {...props} />
}

export const HolidayProvider = (props) => {
    const [holidays, setHolidays] = useState(null);
    const { profile } = useContext(UserContext)
    useEffect(() => {
        const getHolidays = async () => {
            const fetchedHolidays = await fetchHolidays()
            if (fetchedHolidays)
                setHolidays(fetchedHolidays)
            else
                alert('get holidays failed')
        }
        /*const getMyHoliday = async () => {
            const fetchedHoliday = await fetchHoliday()
            if (fetchedHoliday)
                setHolidays([{...fetchedHoliday}])
            else
                alert('get my holiday failed')
        }*/
        if (profile) {
            //if (profile.role)
                getHolidays()
            //else {
               // getMyHoliday()
            //}
        }
        // eslint-disable-next-line
    }, [profile])

    const fetchHolidays = async () => {
        const res = await fetch("https://astro-rh-back.herokuapp.com/api/holidays", {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
            }),
        })
        const data = await res.json()
        if (res.status === 200){
            await data.holiday
            return data
        }
        else
            return null
    }
    /*const fetchHoliday = async () => {
        const res = await fetch("http://localhost:5050/api/holidays/me", {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
            }),
        })
        const data = await res.json()
        if (res.status === 200)
            return data
        else
            return null
    }*/

    return <HolidayContext.Provider value={{ holidays, setHolidays }} {...props} />
}

export const SocketProvider = (props) => {
    // eslint-disable-next-line
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false)
    const [socket, setSocket] = useState(null) 

    useEffect(() => {
        if (loggedIn) {
          const socketConnection = io("https://astro-rh-back.herokuapp.com")
          socketConnection.on("connected", (msg) => {
            console.log(msg)
            setSocket(socketConnection)
          })
        }
    }, [loggedIn])
      
    return <SocketContext.Provider value={{socket, setSocket}} {...props}/>
}