import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { UserProvider, HolidayProvider } from './lib/UserContext';


function App() {

  return (
    <div className="App">
      <Router>
        <Redirect to='/home/profile' />
        <UserProvider >
        <HolidayProvider>
          <PrivateRoute path='/home' component={Nav} />
        </HolidayProvider>
          <Route path="/login" component={SignIn} />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
