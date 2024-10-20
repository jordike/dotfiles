import weatherService from "../services/WeatherService.js";

const useCelcius = Variable(true);
const temperature = Variable(0);
const weatherIcon = Variable("");

function convertTemperatureUnit(temperature) {
    console.log(temperature);

    if (useCelcius.value) {
        return temperature;
    }

    return (temperature * 9 / 5) + 32;
}

function CurrentWeather() {
    return Widget.Box({
        children: [
            Widget.Icon({
                icon: weatherIcon.bind()
            }),
            Widget.Label({
                label: weatherService.bind("currentWeather").as(weather => weather.temperature)
            }),
            Widget.Button({
                onClicked: () => useCelcius.value = !useCelcius.value,
                child: Widget.Label({
                    label: useCelcius.bind().as(celcius => "°" + (celcius ? "C" : "F"))
                })
            })
        ]
    })
}

function WeatherWeekOverview() {
    const weekOverview = weatherService.bind("weekForecast");

    return Widget.Box({
        vertical: true,
        children: weekOverview.as(overview => overview.forecasts.map(forecast => {
            return Widget.Box({
                children: [
                    Widget.Label({
                        label: "icon"
                    }),
                    Widget.Label({
                        label: forecast.minimumTemperature.minimum.toString()
                    })
                ]
            })
        }))
    });
}

export default function WeatherOverview() {
    return Widget.Window({
        name: "weather-overview",
        className: "weather-overview",
        anchor: [ "top" ],
        layer: "top",
        margins: [ 6, 0, 0, 0 ],
        visible: false,
        child: Widget.Box({
            children: [
                WeatherWeekOverview(),
                Widget.Separator(),
                CurrentWeather(),
            ]
        })
    });
}
