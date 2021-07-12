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
            isEditing: false,
            forecastQuery: props.forecastQuery,
            forecast: null
        };

        this.switchModes = this.switchModes.bind(this);
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

    handleSubmit() {
        alert("submitted")
    }

    switchModes() {
        this.setState({isEditing: !this.state.isEditing});
        console.log("toggled: " + this.state.isEditing ? "editing on" : "editing off");
    }
            
    render() {
        const { error, isLoaded, isEditing, forecastQuery, forecast} = this.state;

        console.log(isEditing);

        if (error) {
            return <div class="card">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div class="card">Loading...</div>;
        } else if (isEditing) {
            return (
                <div class="card">
                    <form onSubmit={this.switchModes}>
                        <p>
                            <label htmlFor="place-input">Place name:</label>
                            <input type="text" label="place-input" defaultValue={forecastQuery.place}></input>
                        </p>

                        <p>
                            <label htmlFor="time-input">Hour of the day (0-23):</label>
                            <input type="number" label="time-input" defaultValue={forecastQuery.hour}></input>
                        </p>

                        <input type="submit" value="Save"/>
                    </form>
                </div>
            )
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

                    <button onClick={this.switchModes}>Edit</button>
                </div>
            )
        }
    }
}
            
export default Card;