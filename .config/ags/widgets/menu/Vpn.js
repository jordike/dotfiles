const network = await Service.import("network");
const opened = Variable(false);

function VpnToggle() {
    return Widget.Box({
        className: "menu-option-toggle",
        children: [
            Widget.Button({
                className: "menu-option-toggle-button",
                onClicked: () => {},
                child: Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "menu-option-toggle-button-icon",
                            icon: "network-vpn-symbolic"
                        }),
                        Widget.Label({
                            hexpand: true,
                            xalign: 0,
                            className: "menu-option-toggle-button-label",
                            label: "VPN"
                        })
                    ]
                })
            }),
            Widget.Button({
                className: "menu-option-toggle-expand",
                onClicked: () => opened.value = !opened.value,
                child: Widget.Label({
                    label: opened.bind().as(open => open ? "▲" : "▼")
                })
            })
        ]
    });
}

function VpnConnectionList() {
    return Widget.Revealer({
        className: "vpn-connections",
        revealChild: opened.bind(),
        transition: "slide_down",
        hexpand: true,
        child: Widget.Scrollable({
            className: "menu-list",
            child: Widget.Box({
                vertical: true,
                className: "vpn-connections-list menu-option-toggle-list",
                children: network.vpn.connections.bind().as(connections => {
                    if (connections.length === 0) {
                        return [
                            Widget.Label({
                                className: "empty-list-label",
                                label: "No devices found"
                            })
                        ];
                    }

                    return connections.map(VpnConnection);
                })
            })
        })
    });
}

function VpnConnection(connection) {
    return Widget.Box({
        className: "menu-option-toggle-list-item",
        vertical: true,
        children: [
            Widget.Icon({
                className: "vpn-connection-icon",
                icon: connection.bind("icon-name").as(iconName => `${iconName}-symbolic`)
            }),
            Widget.Label({
                className: "vpn-connection-label",
                label: connection.bind("id")
            }),
            Widget.Switch({
                active: connection.bind("state").as(state => state === "connected"),
                setup: self => self.on("notify::active", () => {
                    device.setConnection(self.active)
                })
            })
        ]
    });
}

export default function Vpn() {
    return Widget.Box({
        className: "vpn",
        vertical: true,
        children: [
            VpnToggle(),
            // VpnConnectionList()
        ]
    });
}
