const battery = await Service.import("battery");

function BatteryIcon() {
    return Widget.Icon({
        className: "icon battery-icon",
        icon: battery.bind("icon_name")
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
