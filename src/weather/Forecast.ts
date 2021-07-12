/**
 * An individual forecast for a location, a date, and a time
 */
class Forecast {
    place: string
    dateTime: Date
    condition: string
    tempCelsius: number

    constructor(place: string, dateTime: Date, condition: string, tempCelsius: number) {
        this.place = place;
        this.dateTime = dateTime;
        this.condition = condition;
        this.tempCelsius = tempCelsius;
    }

    getTimeFormatted() {
        return this.dateTime.toTimeString();
    }

    getDateFormatted() {
        return this.dateTime.toDateString();
    }
}

export default Forecast;