import Separator from "../components/Separator.js";

const bluetooth = await Service.import("bluetooth");
const network = await Service.import("network");

export default function MenuToggle() {
    return Widget.Button({
        className: "menu-toggle",
        onClicked: () => {
            App.closeWindow("notifications-overview");
            App.toggleWindow("menu");
        },
        child: Widget.Box({
            children: [
                Widget.Icon({
                    className: "icon menu-toggle-icon",
                }).hook(network.wifi, self => {
                    self.icon = network.wifi.icon_name;
                }),
                Separator(),
                Widget.Icon({
                    className: "menu-toggle-icon icon",
                }).hook(bluetooth, self => {
                    self.icon = `bluetooth-${bluetooth.enabled ? 'active' : 'disabled'}-symbolic`;
                })
            ]
        })
    });
}
