import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { UserProvider, HolidayProvider, ErrorProvider } from './lib/UserContext';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useState} from 'react'

function App() {

  const [theme, setTheme] = useState("light")
  const Theme = createTheme({
    palette: {
      type: theme,
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Router>
          <ErrorProvider>
            <Redirect to='/home/profile' />
            <UserProvider >
              <HolidayProvider>
                <PrivateRoute path='/home' component={Nav} setTheme={setTheme} theme={theme}/>
              </HolidayProvider>
              <Route path="/login" component={SignIn} />
            </UserProvider>
          </ErrorProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
