import IdleInhibitor from "../widgets/menu/IdleInhibitor.js";
import QuickLock from "../widgets/menu/QuickLock.js";
import Settings from "../widgets/menu/Settings.js";
import ProfilePicture from "../widgets/ProfilePicture.js";
import Separator from "../components/Separator.js"
import Bluetooth from "../widgets/menu/Bluetooth.js";
import Network from "../widgets/menu/Network.js";
import PowerProfiles from "../widgets/menu/PowerProfiles.js";
import VolumeSlider from "../widgets/menu/VolumeSlider.js";
import Cpu from "../widgets/menu/Cpu.js";
import Memory from "../widgets/menu/Memory.js";
import SystemTemperature from "../widgets/menu/SystemTemperature.js";
import ToggleLayoutMode from "../widgets/menu/ToggleLayoutMode.js";
import Brightness from "../widgets/menu/Brightness.js";

export default function Menu() {
    return Widget.Window({
        name: "menu",
        anchor: [ "top", "right" ],
        layer: "top",
        visible: false,
        margins: [ 6 ],
        child: Widget.Box({
            className: "menu-container",
            vertical: true,
            hexpand: true,
            children: [
                Widget.Box({
                    hexpand: true,
                    children: [
                        // ProfilePicture(),
                        // Separator(),
                        QuickLock(),
                        ToggleLayoutMode(),
                        Settings(),
                        IdleInhibitor()
                    ]
                }),
                Widget.Box({
                    vertical: true,
                    hexpand: true,
                    children: [
                        VolumeSlider(),
                        Brightness()
                    ]
                }),
                Widget.Separator(),
                Widget.Box({
                    hexpand: true,
                    children: [
                        Bluetooth(),
                        Network(),
                    ]
                }),
                Widget.Box({
                    hexpand: true,
                    children: [
                        PowerProfiles()
                    ]
                }),
                Widget.Separator(),
                Widget.Box({
                    hexpand: true,
                    vertical: true,
                    children: [
                        Cpu(),
                        Memory(),
                        SystemTemperature()
                    ]
                })
            ]
        })
    });
}
