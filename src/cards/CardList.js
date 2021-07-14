import Card from "./Card";
import React from "react";
import ForecastQuery from "../weather/ForecastQuery";
import { uuid } from "uuidv4";

/**
 * A list of weather cards
 */
class CardList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          error: null,
          isLoaded: false,
          forecastQueries: props.forecastQueries,
          removalCallback: props.removalCallback,
          editCallback: props.editCallback
      }
    }
  
    componentDidMount() {
      this.setState({isLoaded: true});
    }

    componentDidUpdate(prevProps) {
      if (prevProps.forecastQueries != this.props.forecastQueries) {
        this.setState({forecastQueries: this.props.forecastQueries});
      }
    }
  
    render() {
      const { error, isLoaded, forecastQueries } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        // if there aren't any forecasts to render
        if (forecastQueries.length == 0) {
          return (  // return early
            <div class="card-list">
              There aren't any destinations here yet - try adding one.
            </div>
          )
        } 

        // otherwise...

        // Order forecast queries by time of day
        forecastQueries.sort((a, b) => (a.time > b.time) ? 1 : -1);

        return (
            <div class="card-list">

            { // Print cards for each forecast
                forecastQueries.map(
                  (fq) => {
                      return <Card forecastQuery={fq} removalCallback={this.state.removalCallback} editCallback={this.state.editCallback}/> 
                    }
                )
            }
            </div>
        );
      }
    }
}

export default CardList;