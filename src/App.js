import logo from './logo.svg';
import './App.css';
import ForecastQuery from './weather/ForecastQuery';
import CardContainer from './cards/CardContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Forecast</h1>
        <CardContainer></CardContainer>
      </header>
    </div>
  );
}

export default App;
