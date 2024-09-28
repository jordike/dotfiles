const network = await Service.import("network");

const opened = Variable(false);
const passwordVisible = Variable(false);
const expandedAccessPoint = Variable("");
const connecting = Variable(false);

async function connectToAccessPoint(accessPoint, password) {
    if (connecting.value) {
        return;
    }

    let command = `nmcli device wifi connect ${accessPoint}`;

    if (password?.length > 0) {
        command += ` password ${password}`;
    }

    connecting.value = true;

    try {
        await Utils.execAsync(command);
    } catch (exception) {
        Utils.execAsync(`notify-send "Connection failed" "Failed to connect to ${accessPoint}."`);
    }

    connecting.value = false;
}

function NetworkToggle() {
    return Widget.Box({
        className: "menu-option-toggle",
        children: [
            Widget.Button({
                className: "menu-option-toggle-button",
                onClicked: () => network.wifi.enabled = !network.wifi.enabled,
                child: Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "menu-option-toggle-button-icon",
                        }).hook(network.wifi, self => {
                            self.icon = network.wifi.icon_name;
                        }),
                        Widget.Label({
                            hexpand: true,
                            xalign: 0,
                            className: "menu-option-toggle-button-label",
                        }).hook(network.wifi, self => {
                            self.label = network.wifi.ssid || "No connection";
                        })
                    ]
                })
            }),
            Widget.Button({
                className: "menu-option-toggle-expand",
                onClicked: () => {
                    opened.value = !opened.value;

                    if (!opened.value) {
                        expandedAccessPoint.value = "";
                    }

                    network.wifi.scan();
                },
                child: Widget.Label({
                    label: opened.bind().as(open => open ? "▲" : "▼")
                })
            })
        ]
    }).hook(network.wifi, self => {
        self.toggleClassName("active", network.wifi.enabled);
    });
}

function NetworkList() {
    return Widget.Revealer({
        className: "network-networks",
        revealChild: opened.bind(),
        transition: "slide_down",
        hexpand: true,
        child: Widget.Scrollable({
            className: "menu-list",
            child: Widget.Box({
                vertical: true,
                className: "network-networks-list menu-option-toggle-list",
                children: network.bind("wifi").as(wifi => {
                    if (wifi.accessPoints.length === 0) {
                        return [
                            Widget.Label({
                                className: "empty-list-label",
                                label: "No networks found"
                            })
                        ];
                    }

                    return wifi.accessPoints
                        .sort((a, b) => b.strength - a.strength)
                        .map(NetworkListAccessPoint);
                })
            })
        })
    })
}

function NetworkListAccessPoint(accessPoint) {
    const passwordField = Widget.Entry({
        className: "access-point-password-field",
        placeholderText: "Enter password...",
        visibility: passwordVisible.bind(),
        sensitive: true,
        capsLockWarning: true,
        xalign: 0,
        onAccept: ({ text }) => connectToAccessPoint(accessPoint.ssid, text)
    });

    return Widget.Box({
        className: "menu-option-toggle-list-item",
        vertical: true,
        children: [
            Widget.Button({
                className: "access-point-toggle",
                onClicked: () => expandedAccessPoint.value = expandedAccessPoint.value === accessPoint.ssid
                    ? ""
                    : accessPoint.ssid,
                child: Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "access-point-icon",
                            icon: accessPoint.iconName
                        }),
                        Widget.Label({
                            className: "access-point-label",
                            xalign: 0,
                            label: accessPoint.ssid,
                            tooltipText: accessPoint.ssid,
                            maxWidthChars: 10,
                        })
                    ]
                })
            }),
            Widget.Revealer({
                revealChild: expandedAccessPoint.bind().as(expanded => expanded === accessPoint.ssid),
                child: Widget.Box({
                    className: "access-point-connect",
                    vertical: true,
                    children: [
                        Widget.Separator(),
                        Widget.Box({
                            className: "access-point-connect-panel",
                            children: [
                                passwordField,
                                Widget.Button({
                                    className: "toggle-password-visibility",
                                    onClicked: () => passwordVisible.value = !passwordVisible.value,
                                    child: Widget.Icon({
                                        className: "toggle-password-visibility-icon",
                                        icon: `dialog-password-symbolic`
                                    })
                                })
                            ]
                        }),
                        Widget.Button({
                            className: "access-point-connect-button",
                            onClicked: () => connectToAccessPoint(accessPoint.ssid, passwordField.text),
                            child: Widget.Label({
                                label: connecting.bind().as(_connecting => _connecting ? "Connecting..." : "Connect")
                            })
                        })
                    ]
                })
            })
        ]
    });
}

export default function Network() {
    return Widget.Box({
        className: "network",
        vertical: true,
        hexpand: true,
        children: [
            NetworkToggle(),
            NetworkList()
        ]
    });
}
