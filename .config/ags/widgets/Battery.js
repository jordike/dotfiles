const battery = await Service.import("battery");

function BatteryIcon() {
    return Widget.Label({
        className: "icon battery-icon",
        label: "🔋"
    });
}

function BatteryLevel() {
    return Widget.Label({
        className: "battery-level",
        label: battery.bind("percent").as(percentage => percentage > 0 ? `${percentage}%` : "0%")
    });
}

export default function Battery() {
    return Widget.Box({
        className: "battery",
        children: [
            BatteryIcon(),
            BatteryLevel(),
        ]
    });
}
