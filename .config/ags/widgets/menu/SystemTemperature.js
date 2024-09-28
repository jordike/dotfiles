const temperature = Variable("", {
    poll: [10000, "bash -c 'cat /sys/class/thermal/thermal_zone*/temp'"]
});

export default function SystemTemperature() {
    return Widget.Box({
        className: "system-statistic",
        children: [
            Widget.Icon({
                className: "system-statistic-icon icon",
                icon: "temperature-normal-symbolic"
            }),
            Widget.Label({
                className: "system-statistic-label",
                label: temperature.bind().as(_temperature => (parseInt(_temperature) / 1000).toFixed(2).toString() + " °C")
            })
        ]
    });
}
