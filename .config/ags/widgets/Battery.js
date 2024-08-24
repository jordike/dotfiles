import Separator from "../components/Separator.js";

const battery = await Service.import("battery");

function BatteryIcon() {
    return Widget.Label({
        className: "battery-icon",
        label: "🔋 "
    });
}

function BatteryLevel() {
    return Widget.Label({
        className: "battery-level",
        label: battery.bind("percent").as(percentage => percentage > 0 ? `${percentage}%` : "0%")
    });
}

function BatteryProgress() {
    return Widget.CircularProgress({
        className: "battery-progress",
        rounded: true,
        value: battery.bind("percent").as(percentage => percentage > 0 ? percentage / 100 : 0),
    })
}

// TODO: Add time remaining to tooltip
export default function Battery() {
    return Widget.Box({
        className: "battery",
        visible: battery.bind("available"),
        children: [
            BatteryIcon(),
            BatteryLevel(),
            Separator(),
            BatteryProgress()
        ]
    });
}
