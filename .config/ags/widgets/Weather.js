const weatherIcon = Widget.Icon({
    className: "weather-icon"
});

const temperatureLabel = Widget.Label({
    className: "weather-temperature"
});

const spinner = Widget.Spinner({
    name: "weather-spinner"
});

const weatherBox = Widget.Box({
    className: "weather",
    children: []
});

function getLocalIconPath(iconUrl) {
    const segments = iconUrl.split("/");
    const iconFilename = segments[segments.length - 1];

    return "/home/jordi/.config/ags/icons/weather/" + iconFilename;
}

async function fetchWeather() {
    try {
        const response = await Utils.fetch("https://data.buienradar.nl/2.0/feed/json")

        if (!response.ok) {
            console.error("Failed to fetch weather data: " + response.status);

            return {
                available: false
            }
        }

        const weatherData = await response.json()

        const station = weatherData.actual.stationmeasurements.find(station => station.stationname === "Meetstation Volkel");

        return {
            available: true,
            current: {
                temperature: station.temperature.toString() + " °C",
                icon: getLocalIconPath(station.iconurl)
            }
        };
    } catch (exception) {
        console.error(exception);

        return {
            available: false
        }
    }
}

function setLoading() {
    weatherBox.children = [
        spinner
    ];
}

function unsetLoading() {
    weatherBox.children = [
        weatherIcon,
        temperatureLabel
    ];
}

function updateWeather() {
    setLoading();

    fetchWeather().then(weatherData => {
        weatherBox.available = weatherData?.available ?? false;

        if (!weatherData.available) {
            weatherBox.children = [
                Widget.Label({
                    className: "weather-icon",
                    label: "⚠",
                    css: "color: yellow"
                }),
                Widget.Label({
                    className: "weather-temperature",
                    label: "Weather unavailable"
                })
            ];

            return;
        }

        weatherIcon.icon = weatherData.current.icon;
        temperatureLabel.label = weatherData.current.temperature;

        unsetLoading();
    });
}

export default function Weather() {
    const refreshIntervalMinutes = 5;

    setInterval(updateWeather, refreshIntervalMinutes * 300 * 1000);

    updateWeather();

    return weatherBox;
}
