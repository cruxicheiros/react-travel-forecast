import React from "react";
import toast, { Toaster } from 'react-hot-toast';

/**
 * Displays a url that lets you access this forecast again
 */
class ForecastUrlMaker extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            url: window.location.href,
            forecastQueries: props.forecastQueries
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.forecastQueries != this.props.forecastQueries) {
            this.setState({forecastQueries: this.props.forecastQueries}, this.updateUrl)
        }
    }

    updateUrl() {
        let forecastPairs = this.state.forecastQueries.map(
            (fq, i) => {
                return [fq.place, fq.time.toISOString()];
            }
        )

        let params = new URLSearchParams(forecastPairs);
        let urlBase = new URL(window.location.origin)

        window.history.replaceState({}, '', `${urlBase}?${params}`);

        this.setState({url: window.location.href});
        console.log(urlBase.toString())
    }

    copyUrl(event, url) {
        event.preventDefault();
        const copied = () => toast.success("Copied!")
        const notCopied = () => toast.error("Copy failed - try copying manually.")

        navigator.clipboard.writeText(url).then(function() {
            copied()
        }, function() {
            notCopied()
        });
    }
            
    render() {
        const { error, url, forecastQueries} = this.state;

        if (error) {
            return <div class="card">Error: {error.message}</div>;
        } else {
            return (
                <div class="card">
                    <form>
                        <p>
                            <label htmlFor="url_readonly">Direct link to this set of live forecasts:</label>
                            <input type="text" readOnly="true" label="url_readonly" value={url}></input>
                        </p>

                        <p>
                            <button name="copy_url" onClick={(event) => {this.copyUrl(event, url)}}>Copy link to clipboard</button>
                        </p>
                    </form>
                </div>
            )
        }
    }
}
            
export default ForecastUrlMaker;