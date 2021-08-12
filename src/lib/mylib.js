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

export const createDate = (date) => {
    if (date) {
        const newDate = date.split('-')
        newDate[1] = (parseInt(newDate[1]) - 1).toString()
        return new Date(newDate[0], newDate[1], newDate[2], 10, 0)
    } else
        return
}

const exports = {Capitalize, loggedIn, IsAdmin, createDate}

export default exports