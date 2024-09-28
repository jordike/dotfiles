export default function ExpansionButton() {
    return Widget.Box({
        className: "expansion-button",
        children: [
            Widget.Button({
                className: "expansion-button-button",
                onClicked: () => {network.wifi.enabled = !network.wifi.enabled; console.log(network.wifi)},
                child: Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "expansion-button-button-icon",
                            icon: network.wifi.bind("icon_name")
                        }),
                        Widget.Label({
                            className: "expansion-button-button-label",
                            label: network.wifi.bind("ssid").as(ssid => ssid || "No connection")
                        })
                    ]
                })
            }),
            Widget.Button({
                className: "expansion-button-expand",
                onClicked: () => opened.value = !opened.value,
                child: Widget.Label({
                    label: opened.bind().as(open => open ? "▲" : "▼")
                })
            })
        ]
    }).hook(network.wifi, self => {
        self.toggleClassName("active", network.wifi.enabled);
    });
}

