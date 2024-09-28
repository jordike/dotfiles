class WeatherService extends Service {
    static {
        Service.register(
            this,
            {
                "weather-changed": [ "object" ]
            },
            {
                "current-weather": [ "object", "r" ],
                "week-forecast": [ "object", "r" ]
            }
        );
    }

    #currentWeather = { available: false };
    #weekForecast = { available: false };
    #refreshInterval = 60_000;

    constructor() {
        super();

        Utils.interval(this.#refreshInterval, async () => {
            this.#update()
                .catch(exception => {
                    console.error(exception);
                });
        });
    }

    get currentWeather() {
        return this.#currentWeather;
    }

    get weekForecast() {
        return this.#weekForecast;
    }

    #getUnavailableFormat() {
        return {
            available: false,
            currentWeather: {
                available: false
            },
            weekForecast: {
                available: false
            }
        };
    }

    async #update() {
        const response = await this.#fetchApiData()
            .catch(exception => {
                console.error(exception);

                return this.#getUnavailableFormat();
            });

        if (!response?.available) {
            return response;
        }

        this.#currentWeather = response.currentWeather;
        this.#weekForecast = response.weekForecast;

        this.emit("changed");
    }

    async #fetchApiData() {
        const response = await Utils.fetch("https://data.buienradar.nl/2.0/feed/json")
            .catch(exception => {
                console.error(exception);

                return this.#getUnavailableFormat();
            });

        if (response.status !== 200) {
            return this.#getUnavailableFormat();
        }

        const responseJson = await response.json();

        return this.#parseApiResponse(responseJson);
    }

    #getLocalIconPath(iconUrl) {
        const segments = iconUrl.split("/");
        const iconFilename = segments[segments.length - 1];

        return iconFilename.toLowerCase();
    }

    #parseApiResponse(response) {
        // Meetstation Volkel - Regio Uden
        const weatherStation = response.actual.stationmeasurements.find(station => station.stationid === 6375);

        if (weatherStation === undefined) {
            return this.#getUnavailableFormat();
        }

        return {
            available: true,
            currentWeather: {
                temperature: weatherStation.temperature,
                groundTemperature: weatherStation.groundtemperature,
                feelTemperature: weatherStation.feeltemperature,
                weatherDescription: weatherStation.weatherdescription,
                windDirection: weatherStation.winddirection,
                windSpeed: weatherStation.windspeed,
                stationName: weatherStation.stationname,
                stationRegion: weatherStation.regio,
                humidity: weatherStation.humidity,
                sunrise: response.actual.sunrise,
                sunset: response.actual.sunset,
                iconName: this.#getLocalIconPath(weatherStation.fullIconUrl)
            },
            weekForecast: {
                forecasts: response.forecast.fivedayforecast.map(forecast => {
                    return {
                        date: forecast.day,
                        weatherDescription: forecast.weatherdescription,
                        icon: forecast.iconurl,
                        minimumTemperature: {
                            minimum: forecast.mintemperatureMin,
                            maximum: forecast.mintemperatureMax
                        },
                        maximumTemperature: {
                            minimum: forecast.maxtemperatureMin,
                            maximum: forecast.maxtemperatureMax
                        },
                        rain: {
                            chance: forecast.rainChance,
                            min: forecast.mmRainMin,
                            max: forecast.mmRainMax
                        },
                        sunChange: forecast.sunChance,
                        windDirection: forecast.windDirection,
                    };
                })
            }
        }
    }
}

const weatherService = new WeatherService();

export default weatherService;
