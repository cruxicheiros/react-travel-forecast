import React from "react";
import ResultTransformer from "../api/ResultTransformer";
import ForecastQuery from "../weather/ForecastQuery";

/**
 * A card that displays weather data for a time and location
 */
class Card extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            isLoaded: false,
            isEditing: props.isEditing || false,
            forecastQuery: props.forecastQuery,
            forecast: null,
            removalCallback : props.removalCallback,
            editCallback: props.editCallback
        };

        this.switchModes = this.switchModes.bind(this);
    }
    
    componentDidMount() {
        this.updateWithFreshApiCall();
    }

    
    componentDidUpdate(prevProps) {
        if (prevProps.forecastQuery.place != this.props.forecastQuery.place || prevProps.forecastQuery.time != this.props.forecastQuery.time) {
            console.log(prevProps.forecastQuery.place, "=>", this.props.forecastQuery.place)
            this.setState({forecastQuery: this.props.forecastQuery}, this.updateWithFreshApiCall)
        }
    }

    updateWithFreshApiCall() {
        console.log(this.state.forecastQuery)

        fetch("http://api.weatherapi.com/v1/forecast.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&q=" + this.state.forecastQuery.place + "&aqi=no")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                
                let resultTransformer = new ResultTransformer;
                
                let forecast = resultTransformer.transform(result, this.state.forecastQuery.time)
                    
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

    handleSubmit(event) {
        event.preventDefault();
        
        let newPlace = event.target.elements[0].value;
        let hoursMinutes = event.target.elements[1].value.split(":");
        let newTime = new Date();
        newTime.setHours(hoursMinutes[0]);
        newTime.setMinutes(hoursMinutes[1]);

        let newForecastQuery = new ForecastQuery(newPlace, newTime, this.state.forecastQuery.uniqueId);

        this.setState({"forecastQuery": newForecastQuery}, this.updateWithFreshApiCall);
        this.state.editCallback(newForecastQuery);

        this.switchModes()
    }

    switchModes() {
        this.setState({isEditing: !this.state.isEditing});
        console.log("toggled: " + this.state.isEditing ? "editing on" : "editing off");
    }
            
    render() {
        const { error, isLoaded, isEditing, forecastQuery, forecast} = this.state;

        if (error) {
            return <div class="card">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div class="card">Loading...</div>;
        } else if (isEditing) {
            return (
                <div class="card">
                    <form onSubmit={(event) => {this.handleSubmit(event)}}>
                        <p>
                            <label htmlFor="place_input">Place name:</label>
                            <input type="text" label="place_input" defaultValue={forecast.place}></input>
                        </p>

                        <p>
                            <label htmlFor="time_input">Time of day:</label>
                            <input type="time" label="time_input" defaultValue={forecast.getTimeFormatted()}></input>
                        </p>

                        <input type="submit" value="Save"/>
                    </form>
                </div>
            )
        } else {
            return (
                <div class="card">
                    <div class="card-heading">
                        <div class="card-heading-place-info">
                            <h2>{forecast.place}</h2>
                            <h3>{forecast.country}</h3>
                            <time>{forecast.getTimeFormatted()}</time>
                            <time>{forecast.getDateFormatted()}</time>
                        </div>

                        <div>
                            <img src={forecast.iconUrl} alt={forecast.condition}></img>
                            <p class="weather">{forecast.condition}</p>
                        </div>
                    </div>
                    
                    <div class="card-body">
                        <div class="temperature">
                            <p class="temperature-display">{forecast.getTempFormattedCelsius()}</p>
                            <p class="feels-like-display">Feels like {forecast.getFeelsLikeFormattedCelsius()}</p>
                        </div>

                        <table class="weather-info">
                            <tr>
                                <th>
                                    Precipitation
                                </th>
                                <td>
                                    {forecast.getPrecipitationFormattedMm()}
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    Humidity
                                </th>
                                <td>
                                    {forecast.getHumidityFormatted()}
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    Wind speed
                                </th>
                                <td>
                                    {forecast.getWindSpeedFormattedKph()}
                                </td>
                            </tr>
                        </table>
                    </div>

                    <button onClick={this.switchModes}>Edit</button>
                    <button onClick={(event) => {this.state.removalCallback(event, this.state.forecastQuery.uniqueId)}}>Remove</button>
                </div>
            )
        }
    }
}
            
export default Card;