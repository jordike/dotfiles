import IdleInhibitor from "../widgets/menu/IdleInhibitor.js";
import QuickLock from "../widgets/menu/QuickLock.js";
import Settings from "../widgets/menu/Settings.js";
import ProfilePicture from "../widgets/ProfilePicture.js";
import Separator from "../components/Separator.js"
import HorizontalSeparator from "../components/HorizontalSeparator.js";
import Bluetooth from "../widgets/menu/Bluetooth.js";
import Network from "../widgets/menu/Network.js";
import PowerProfiles from "../widgets/menu/PowerProfiles.js";
import VolumeSlider from "../widgets/menu/VolumeSlider.js";
import Cpu from "../widgets/menu/Cpu.js";
import Memory from "../widgets/menu/Memory.js";
import SystemTemperature from "../widgets/menu/SystemTemperature.js";

export default function Menu() {
    return Widget.Window({
        name: "menu",
        anchor: [ "top", "right" ],
        layer: "top",
        visible: false,
        child: Widget.Box({
            vertical: true,
            children: [
                Widget.Box({
                    children: [
                        // ProfilePicture(),
                        // Separator(),
                        QuickLock(),
                        Settings(),
                        IdleInhibitor()
                    ]
                }),
                Widget.Box({
                    vertical: true,
                    children: [
                        VolumeSlider()
                    ]
                }),
                HorizontalSeparator(),
                Widget.Box({
                    children: [
                        Bluetooth(),
                        Network(),
                    ]
                }),
                Widget.Box({
                    children: [
                        PowerProfiles()
                    ]
                }),
                HorizontalSeparator(),
                Widget.Box({
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
