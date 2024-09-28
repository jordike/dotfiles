import IdleInhibitor from "../widgets/menu/IdleInhibitor.js";
import QuickLock from "../widgets/menu/QuickLock.js";
import Settings from "../widgets/menu/Settings.js";
import Bluetooth from "../widgets/menu/Bluetooth.js";
import Network from "../widgets/menu/Network.js";
import PowerProfiles from "../widgets/menu/PowerProfiles.js";
import VolumeSlider from "../widgets/menu/VolumeSlider.js";
import Cpu from "../widgets/menu/Cpu.js";
import Memory from "../widgets/menu/Memory.js";
import SystemTemperature from "../widgets/menu/SystemTemperature.js";
import ToggleLayoutMode from "../widgets/menu/ToggleLayoutMode.js";
import Brightness from "../widgets/menu/Brightness.js";
import Vpn from "../widgets/menu/Vpn.js";
import PowerMenu from "../widgets/menu/PowerMenu.js";

export default function Menu() {
    return Widget.Window({
        name: "menu",
        anchor: [ "top", "right" ],
        layer: "top",
        visible: false,
        margins: [ 6 ],
        keymode: "on-demand",
        child: Widget.Box({
            className: "menu-container",
            children: [
                Widget.Box({
                    vexpand: true,
                    vertical: true,
                    className: "menu-actions",
                    children: [
                        QuickLock(),
                        ToggleLayoutMode(),
                        Settings(),
                        IdleInhibitor(),
                        PowerMenu()
                    ]
                }),
                Widget.Box({
                    className: "menu-content",
                    vertical: true,
                    vexpand: true,
                    hexpand: true,
                    children: [
                        Widget.Box({
                            className: "menu-sliders",
                            vertical: true,
                            hexpand: true,
                            children: [
                                VolumeSlider(),
                                Brightness()
                            ]
                        }),
                        Widget.Box({
                            className: "menu-toggles",
                            children: [
                                Widget.Box({
                                    className: "menu-toggles-section",
                                    vertical: true,
                                    children: [
                                        Network(),
                                        Vpn()
                                    ]
                                }),
                                Widget.Box({
                                    className: "menu-toggles-section",
                                    vertical: true,
                                    children: [
                                        Bluetooth(),
                                        PowerProfiles()
                                    ]
                                }),
                            ]
                        }),
                        Widget.Box({
                            className: "menu-stats",
                            hexpand: true,
                            children: [
                                Cpu(),
                                Memory(),
                                SystemTemperature()
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
