import Battery from "../widgets/Battery.js";
import Clock from "../widgets/Clock.js";
import MenuToggle from "../widgets/MenuToggle.js";
import Notifications from "../widgets/Notifications.js";
import Separator from "../components/Separator.js";
import Updates from "../widgets/Updates.js";
import Volume from "../widgets/Volume.js";
import Weather from "../widgets/Weather.js";
import Workspaces from "../widgets/Workspaces.js";
import NextEvent from "../widgets/NextEvent.js";
import SystemTray from "../widgets/SystemTray.js";
import calendarService from "../services/CalendarService.js";
import NowPlaying from "../widgets/NowPlaying.js";

const battery = await Service.import("battery");
const tray = await Service.import("systemtray");
const mpris = await Service.import("mpris");

function Module(child, options = {}) {
    const separator = null;//Separator();

    return Widget.Box({
        visible: options.visible ?? true,
        spacing: 8,
        children: [
            (options.frontSeparator ?? false)
                ? separator
                : null,
            child,
            (options.backSeparator ?? true)
                ? separator
                : null,
        ]
    });
}

function BarLeft() {
    return Widget.Box({
        spacing: 8,
        hpack: "start",
        children: [
            Module(Workspaces(), {
                backSeparator: false
            }),
            Module(NowPlaying(), {
                frontSeparator: true,
                backSeparator: false
            }).hook(mpris, self => {
                let visible = mpris.players.length;

                if (mpris.players.filter(player => player.playBackStatus === "Playing").length === 0) {
                    visible = false;
                }

                self.visible = visible;
            }, "changed"),
            Module(NextEvent(), {
                visible: calendarService.bind("hasCalendars"),
                frontSeparator: true,
                backSeparator: false
            }),
            Module(SystemTray(), {
                visible: tray.bind("items").as(items => items.length > 0),
                frontSeparator: true,
                backSeparator: false
            })
        ]
    });
}

function BarCenter() {
    return Widget.Box({
        spacing: 8,
        hpack: "center",
        children: [
            Module(Clock(), {
                backSeparator: false,
            })
        ]
    });
}

function BarRight() {
    return Widget.Box({
        spacing: 8,
        hpack: "end",
        children: [
            Module(Weather()),
            Module(Volume()),
            Module(Updates()),
            Module(Notifications()),
            Module(Battery(), {
                visible: battery.bind("available")
            }),
            Module(MenuToggle(), {
                backSeparator: false
            }),
        ]
    });
}

export default function TopBar() {
    return Widget.Window({
        name: "top_bar",
        className: "bar",
        anchor: [ "top", "left", "right" ],
        exclusivity: "exclusive",
        attribute: {
            alwaysOpen: true
        },
        child: Widget.CenterBox({
            start_widget: BarLeft(),
            center_widget: BarCenter(),
            end_widget: BarRight()
        })
    });
}
