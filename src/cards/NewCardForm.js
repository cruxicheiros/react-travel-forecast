import Card from "./Card";
import React from "react";
import ForecastQuery from "../weather/ForecastQuery";

/**
 * Add a new card to the list of cards
 */
class NewCardForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          error: null,
          isLoaded: false,
          submitCallback: props.submitCallback
      }
    }
  
    componentDidMount() {
      this.setState({isLoaded: true});
    }

    handleSubmit(event) {
        this.state.submitCallback(event);
    }
  
    render() {
      const { error, isLoaded } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div class="card">
                <h2>Add another destination</h2>
                <form onSubmit={(event) => {this.handleSubmit(event)}}>
                    <p>
                        <label htmlFor="place_input">Place name:</label>
                        <input type="text" label="place_input"></input>
                    </p>

                    <p>
                        <label htmlFor="time_input">Time of day:</label>
                        <input type="time" label="time_input"></input>
                    </p>

                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
      }
    }
}

export default NewCardForm;