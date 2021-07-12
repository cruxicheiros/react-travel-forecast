/**
 * The information required to retrieve a forecast from the weather api
 */
class ForecastQuery {
    place: string
    hour: number

    constructor(place: string, hour: number) {
        this.place = place;
        this.hour = hour;
    }
}

export default ForecastQuery;