/**
 * An individual forecast for a location, a date, and a time
 */
class Forecast {
    place: string
    country: string
    dateTime: Date
    condition: string
    iconUrl: string
    tempCelsius: number
    tempFahrenheit: number
    feelsLikeCelsius: number
    feelsLikeFahrenheit: number
    windKph: number
    windMph: number
    precipitationMm: number
    precipitationIn: number
    humidity: number
    weatherCode: number

    constructor(
        place: string, 
        country: string,
        dateTime: Date, 
        condition: string, 
        iconUrl: string,
        tempCelsius: number,
        tempFahrenheit: number,
        feelsLikeCelsius: number,
        feelsLikeFahrenheit: number,
        windKph: number,
        windMph: number,
        precipitationMm: number,
        precipitationIn: number,
        humidity: number,
        weatherCode: number
        ) {
        this.place = place;
        this.country = country;
        this.dateTime = dateTime;
        this.condition = condition;
        this.iconUrl = iconUrl;
        this.tempCelsius = tempCelsius;
        this.tempFahrenheit = tempFahrenheit;
        this.feelsLikeCelsius = feelsLikeCelsius;
        this.feelsLikeFahrenheit = feelsLikeFahrenheit;
        this.windKph = windKph;
        this.windMph = windMph;
        this.precipitationMm = precipitationMm;
        this.precipitationIn = precipitationIn;
        this.humidity = humidity;
        this.weatherCode = weatherCode;
    }

    getTimeFormatted() {
        return this.dateTime.getHours().toString().padStart(2, '0') + ":" + this.dateTime.getMinutes().toString().padStart(2, '0');
    }

    getDateFormatted() {
        return this.dateTime.toDateString();
    }

    getTempFormattedCelsius() {
        return this.tempCelsius.toString() + "°C";
    }

    getFeelsLikeFormattedCelsius() {
        return this.feelsLikeCelsius.toString() + "°C";
    }

    getFeelsLikeFormattedFahrenheit() {
        return this.feelsLikeFahrenheit.toString() + "°F";
    }

    getWindSpeedFormattedKph() {
        return this.windKph.toString() + " kph";
    }

    getWindSpeedFormattedMph() {
        return this.windMph.toString() + " mph";
    }

    getPrecipitationFormattedMm() {
        return this.precipitationMm.toString() + "mm";
    }

    getPrecipitationFormattedInches() {
        return this.precipitationIn.toString() + "in";
    }

    getHumidityFormatted() {
        return this.humidity.toString() + "%";
    }
}

export default Forecast;