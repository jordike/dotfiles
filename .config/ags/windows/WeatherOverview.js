import HorizontalSeparator from "../components/HorizontalSeparator.js";
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
                label: temperature.bind()
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

function HourlyWeatherOverview() {
    return Widget.Box({
    });
}

function WeatherWeekOverview() {
    return Widget.Box({
    });
}

export default function WeatherOverview() {
    return Widget.Window({
        name: "weather-overview",
        className: "weather",
        anchor: [ "top" ],
        layer: "top",
        margins: [ 6, 0, 0, 0 ],
        visible: false,
        child: Widget.Box({
            vertical: true,
            children: [
                CurrentWeather(),
                HorizontalSeparator(),
                WeatherWeekOverview()
            ]
        })
    });
}
