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
            time,
            hourlyResult.condition.text,
            hourlyResult.temp_c
        );
    }
}

export default ResultTransformer;