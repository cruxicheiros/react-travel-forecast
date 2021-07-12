import Card from "./Card";
import React from "react";
import ResultTransformer from "../api/ResultTransformer";

/**
 * A list of weather cards
 */
class CardList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          error: null,
          isLoaded: false,
          forecastQueries: props.forecastQueries
      }
    }
  
    componentDidMount() {
      this.setState({isLoaded: true})
    }
  
    render() {
      const { error, isLoaded, forecastQueries } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div class="card-list">
            { // Print cards for each forecast
                forecastQueries.map(
                  (fq) => {
                      return <Card forecastQuery={fq} /> 
                    }
                )
            }
            </div>
        );
      }
    }
}

export default CardList;