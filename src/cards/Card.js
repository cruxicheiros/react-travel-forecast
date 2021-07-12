import React from "react";
import ResultTransformer from "../api/ResultTransformer";

/**
 * A card that displays weather data for a time and location
 */
class Card extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            isLoaded: false,
            forecastQuery: props.forecastQuery,
            forecast: null
        };
    }
    
    componentDidMount() {
        fetch("http://api.weatherapi.com/v1/forecast.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&q=" + this.state.forecastQuery.place + "&aqi=no")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                
                let resultTransformer = new ResultTransformer;
                
                let forecast = resultTransformer.transform(result, this.state.forecastQuery.hour)
                    
                this.setState({
                    isLoaded: true,
                    forecast: forecast
                });
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
            
    render() {
        const { error, isLoaded, forecastQuery, forecast } = this.state;

        if (error) {
            return <div class="card">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div class="card">Loading...</div>;
        } else {
            return (
                <div class="card">
                    <h2>{forecast.place}</h2>
                    <p>
                        <time>{forecast.getTimeFormatted()}</time>
                    </p>
                    
                    <p>
                        <date>{forecast.getDateFormatted()}</date>
                    </p>
                    
                    <p class="weather">{forecast.condition}</p>
                </div>
            )
        }
    }
}
            
export default Card;