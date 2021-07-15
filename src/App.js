import logo from './logo.svg';
import './App.css';
import CardContainer from './cards/CardContainer';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Forecast</h1>
        <CardContainer></CardContainer>
        <Toaster></Toaster>
      </header>
    </div>
  );
}

export default App;
