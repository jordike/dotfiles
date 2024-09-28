import weatherService from "../services/WeatherService.js";

export default function Weather() {
    const currentWeather = weatherService.bind("currentWeather");

    return Widget.EventBox({
        onPrimaryClick: () => App.toggleWindow("weather-overview"),
        child: Widget.Box({
            className: "weather",
            children: [
                Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "icon weather-icon",
                            icon: currentWeather.as(weather => currentWeather.available ? "/home/jordi/.config/ags/icons/weather/" + weather?.iconName : "dialog-warning-symbolic")
                        }),
                        Widget.Label({
                            className: "weather-temperature",
                            label: currentWeather.as(weather => currentWeather.available ? weather?.temperature.toString() + " °C" : "Unavailable")
                        })
                    ]
                }),
            ]
        })
    });
}
