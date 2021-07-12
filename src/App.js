import logo from './logo.svg';
import './App.css';
import CardList from './cards/CardList';
import ForecastQuery from './weather/ForecastQuery';

function App() {
  let forecastQueries = [
    new ForecastQuery("London", 12),
    new ForecastQuery("Nottingham", 16)
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Forecast</h1>

        <CardList forecastQueries={forecastQueries}/>

      </header>
    </div>
  );
}

export default App;
