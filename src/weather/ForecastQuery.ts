import { uuid } from "uuidv4";

/**
 * The information required to retrieve a forecast from the weather api
 */
class ForecastQuery {
    place: string
    uniqueId: string
    time: Date

    constructor(place: string, time: Date, uniqueId: string) {
        this.place = place;
        this.time = time;
        this.uniqueId = uniqueId || uuid();
    }
}

export default ForecastQuery;