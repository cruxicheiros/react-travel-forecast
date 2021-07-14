import Card from "./Card";
import React from "react";
import CardList from "./CardList";
import NewCardForm from "./NewCardForm";
import ForecastQuery from "../weather/ForecastQuery";

/**
 * A list of weather cards
 */
class CardContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          error: null,
          isLoaded: false,
          forecastQueries: []
      }

    }
  
    componentDidMount() {
      this.setState({isLoaded: true});
    }

    newCardCallback(event) {
        event.preventDefault();
        
        let newPlace = event.target.elements[0].value;
        
        let hoursMinutes = event.target.elements[1].value.split(":");
        let newTime = new Date();
        newTime.setHours(hoursMinutes[0]);
        newTime.setMinutes(hoursMinutes[1]);

        let newForecastQuery = new ForecastQuery(newPlace, newTime);
        let updatedForecasts = this.state.forecastQueries.concat(newForecastQuery);

        this.setState({"forecastQueries": [...updatedForecasts]})
    }
    
    removeCardCallback(event, uniqueId) {
        let filteredQueries = this.state.forecastQueries.filter((value, index, arr) => {return value.uniqueId != uniqueId});
        this.setState({forecastQueries: filteredQueries});
    }

    editCardCallback(forecastQuery) {
        // Remove old card
        let filteredQueries = this.state.forecastQueries.filter((value, index, arr) => {return value.uniqueId != forecastQuery.uniqueId});
        // Add new version
        filteredQueries.push(forecastQuery);

        this.setState({forecastQueries: filteredQueries});
    }
  
    render() {
      const { error, isLoaded } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div class="card-container">
                <NewCardForm submitCallback={this.newCardCallback.bind(this)}></NewCardForm>
                <CardList forecastQueries={this.state.forecastQueries} editCallback={this.editCardCallback.bind(this)} removalCallback={this.removeCardCallback.bind(this)}/>
            </div>
        );
      }
    }
}

export default CardContainer;