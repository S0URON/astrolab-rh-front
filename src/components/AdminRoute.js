import { Route, Redirect } from 'react-router-dom';
import { IsAdmin } from '../lib/mylib';
import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';


const AdminRoute = ({component: Component, ...rest}) => {
    const {profile} = useContext(UserContext)
    return (
        <Route {...rest} render={props => (
            IsAdmin(profile ? profile : {role : "other"}) ? <Component {...props} />
            : <Redirect to="/home" />
        )} />
    )
}

export default AdminRoute
