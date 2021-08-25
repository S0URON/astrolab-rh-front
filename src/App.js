import './App.css';
import { SocketProvider } from './lib/UserContext';
import AppContainer from './components/AppContainer';


function App() {
  return (
    <div className="App">
      <SocketProvider>
        <AppContainer />
      </SocketProvider>
    </div>
  );
}

export default App;
