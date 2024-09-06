import weatherService from "../services/WeatherService.js";

export default function Weather() {
    const currentWeather = weatherService.bind("currentWeather");

    return Widget.EventBox({
        onPrimaryClick: () => App.toggleWindow("weather-overview"),
        child: Widget.Box({
            className: "weather",
            children: [
                Widget.Icon({
                    className: "icon weather-icon",
                    icon: currentWeather.as(currentWeather => "/home/jordi/.config/ags/icons/weather/" + currentWeather?.iconName)
                }),
                Widget.Label({
                    className: "weather-temperature",
                    label: currentWeather.as(currentWeather => currentWeather?.temperature.toString() + " °C"?? "Unavailable")
                })
            ]
        })
    });
}
