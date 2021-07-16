import { defaultCipherList } from "constants";
import Forecast from "../weather/Forecast";

/**
 * Transforms an api result into a forecast object
 */
class ResultTransformer {
    constructor() {};

    transform(apiResult: any, time: Date) {
        let hourlyResult = apiResult.forecast.forecastday[0]["hour"][time.getHours()];

        return new Forecast(
            apiResult.location.name,
            apiResult.location.country,
            time,
            hourlyResult.condition.text,
            hourlyResult.condition.icon,
            hourlyResult.temp_c,
            hourlyResult.temp_f,
            hourlyResult.feelslike_c,
            hourlyResult.feelslike_f,
            hourlyResult.wind_kph,
            hourlyResult.wind_mph,
            hourlyResult.precip_mm,
            hourlyResult.precip_in,
            hourlyResult.humidity,
            hourlyResult.code
        );
    }
}

export default ResultTransformer;