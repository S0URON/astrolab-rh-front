import validator from "validator"
export const errorHandler = (err) => {
    if (err.includes("email"))
        return { msg: err, type: "email" }
    else if (err.includes("old password"))
        return { msg: err, type: "oldpass" }
    else if (err.includes("pass"))
        return { msg: err, type: "password" }
}

export const formValidator = (profile, patch, setError) => {
    let thereIsError = false;
    if(Object.keys(profile).includes("firstName")){
        if(!profile.firstName){
            setError({msg :"firstName is required", type:"firstName"})
            thereIsError = true
        }else if(!validator.isAlpha(profile.firstName)){
            setError({msg :"firstName must not contain numbers or symbols", type:"firstName"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes("lastName")){
        if(!profile.lastName){
            setError({msg :"lastname is required", type:"lastName"})
            thereIsError = true
        }else if(!validator.isAlpha(profile.lastName)){
            setError({msg :"lastName must not contain numbers or symbols", type:"lastName"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes("email")){
        if(!profile.email){
            setError({msg :"email is required", type:"email"})
            thereIsError = true
        }else if(!validator.isEmail(profile.email)){
            setError({msg :"wrong email format", type:"email"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes("phone_primary")){
        if(!profile.phone_primary){
            setError({msg :"phone_primary is required", type:"phone_primary"})
            thereIsError = true
        }else if(!validator.isNumeric(profile.phone_primary)){
            setError({msg :"phone number must be numeric", type:"phone_primary"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes("phone_secondary")){
        if(!profile.phone_secondary){
            setError({msg :"phone_secondary is required", type:"phone_secondary"})
            thereIsError = true
        }else if(!validator.isNumeric(profile.phone_secondary)){
            setError({msg :"phone number must be numeric", type:"phone_secondary"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes("adress")){
        if(!profile.adress){
            setError({msg :"adress is required", type:"adress"})
            thereIsError = true
        }else if(!validator.isAlphanumeric(profile.adress)){
            setError({msg :"adress is not alpha numeric", type:"adress"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes("hiring_date")){
        if(!profile.hiring_date){
            setError({msg :"hiring_date is required", type:"date"})
            thereIsError = true
        }else if(!validator.isDate(profile.hiring_date)){
            setError({msg :"wrong date format", type:"date"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes('password')){
        if(!profile.password){
            setError({msg :"password is required", type:"password"})
            thereIsError = true
        }else if(!validator.isStrongPassword(profile.password)){
            setError({msg :"weak password", type:"password"})
            thereIsError = true
        }
    }//----------------
    if(Object.keys(profile).includes('cin')){
        if(!profile.cin){
            setError({msg :"cin", type:"cin"})
            thereIsError = true
        }else if(!validator.isNumeric(profile.cin)){
            setError({msg :"wrong cin format", type:"cin"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes('birthdate')){
        if(!profile.birthdate){
            setError({msg :"birthdate is required", type:"birthdate"})
            thereIsError = true
        }else if(!validator.isDate(profile.birthdate)){
            setError({msg :"wrong birthdate format", type:"birthdate"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes('post')){
        if(!profile.post){
            setError({msg :"post is required", type:"post"})
            thereIsError = true
        }else if(!validator.isAlpha(profile.post)){
            setError({msg :"wrong post format", type:"post"})
            thereIsError = true
        }
    }
    if(Object.keys(profile).includes('leaving_date')){
        if(!profile.leaving_date){
            setError({msg :"leaving_date is required", type:"leaving_date"})
            thereIsError = true
        }else if(!validator.isDate(profile.leaving_date)){
            setError({msg :"wrong leaving_date format", type:"leaving_date"})
            thereIsError = true
        }
    }
    if(!thereIsError)
        patch()
}

const exports = {errorHandler, formValidator}
export default exports
