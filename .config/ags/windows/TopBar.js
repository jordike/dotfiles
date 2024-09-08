import Battery from "../widgets/Battery.js";
import Clock from "../widgets/Clock.js";
import MenuToggle from "../widgets/MenuToggle.js";
import Notifications from "../widgets/Notifications.js";
import PowerMenu from "../widgets/PowerMenu.js";
import Separator from "../components/Separator.js";
import Updates from "../widgets/Updates.js";
import Volume from "../widgets/Volume.js";
import Weather from "../widgets/Weather.js";
import WindowTitle from "../widgets/WindowTitle.js";
import Workspaces from "../widgets/Workspaces.js";
import NextEvent from "../widgets/NextEvent.js";

const battery = await Service.import("battery");

function BarLeft() {
    return Widget.Box({
        spacing: 8,
        children: [
            Workspaces(),
            Separator(),
            NextEvent(),
            // WindowTitle()
        ]
    });
}

function BarCenter() {
    return Widget.Box({
        spacing: 8,
        children: [
            Clock()
        ]
    });
}

function BarRight() {
    return Widget.Box({
        spacing: 8,
        hpack: "end",
        children: [
            Weather(),
            Separator(),
            Volume(),
            Separator(),
            Updates(),
            Separator(),
            Notifications(),
            Separator(),
            Widget.Box({
                visible: battery.bind("available"),
                children: [
                    Battery(),
                    Separator(),
                ]
            }),
            MenuToggle(),
            Separator(),
            PowerMenu()
        ]
    });
}

export default function TopBar() {
    return Widget.Window({
        name: "top_bar",
        className: "bar",
        anchor: [ "top", "left", "right" ],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            start_widget: BarLeft(),
            center_widget: BarCenter(),
            end_widget: BarRight()
        })
    });
}
