import { defaultCipherList } from "constants";
import Forecast from "../weather/Forecast";

/**
 * Transforms an api result into a forecast object
 */
class ResultTransformer {
    constructor() {};

    transform(apiResult: any, hour: number) {
        let hourlyResult = apiResult.forecast.forecastday[0]["hour"][hour];

        return new Forecast(
            apiResult.location.name,
            new Date(hourlyResult.time),
            hourlyResult.condition.text,
            hourlyResult.temp_c
        );
    }
}

export default ResultTransformer;