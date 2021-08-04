export const Capitalize = (first) => {
    let name = '';
    for(let i = 0 ; i < first.length; i++)
        i===0 ? name += first[i].toUpperCase() : name+= first[i].toLowerCase();
    return name
}

export const loggedIn = () => {
    if(localStorage.getItem("token"))
        return true
    else
        return false
}

export const IsAdmin = (profile) => {
    if(profile.role === "admin")
        return true
    else
        return false
}


const exports = {Capitalize, loggedIn, IsAdmin}

export default exports