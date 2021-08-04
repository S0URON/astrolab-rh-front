import { Route, Redirect } from 'react-router-dom';
import { loggedIn } from '../lib/mylib';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            loggedIn() ? <Component {...props} />
            : <Redirect to="/login" />
        )} />
    )
}

export default PrivateRoute
