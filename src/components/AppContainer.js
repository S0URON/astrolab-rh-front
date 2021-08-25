import Home from './Home';
import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { UserProvider, HolidayProvider,SocketContext } from '../lib/UserContext';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState, useContext} from 'react'

const AppContainer = () => {
    const {socket} = useContext(SocketContext)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const [requestedHolidays, setRequestedHolidays] = useState([])
    const Theme = createTheme({
        palette: {
            type: theme,
        }
    });

    socket?.on("requestToAdmin", (msg) => {
        if(requestedHolidays.includes(msg))
            setRequestedHolidays(requestedHolidays.map(el => (el._id === msg._id ? {...el, msg} : el)))
        else
            setRequestedHolidays([...requestedHolidays, msg])
        console.log(msg)
    })
    return (
        <div>
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <Router>
                    <UserProvider >
                        <HolidayProvider>
                            <PrivateRoute path='/home' component={Home} setTheme={setTheme} theme={theme} requestedHolidays={requestedHolidays}/>
                        </HolidayProvider>
                        <Route path="/login" render={() => (<SignIn />)} />
                    </UserProvider>
                </Router>
            </ThemeProvider>
        </div>
    )
}

export default AppContainer
