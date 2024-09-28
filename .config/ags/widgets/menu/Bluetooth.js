const bluetooth = await Service.import("bluetooth");
const opened = Variable(false);

function BluetoothToggle() {
    return Widget.Box({
        className: "menu-option-toggle",
        children: [
            Widget.Button({
                className: "menu-option-toggle-button",
                onClicked: () => bluetooth.enabled = !bluetooth.enabled,
                child: Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "menu-option-toggle-button-icon",
                            icon: bluetooth.bind("enabled").as(_enabled => `bluetooth-${_enabled ? "active" : "disabled"}-symbolic`)
                        }),
                        Widget.Label({
                            hexpand: true,
                            xalign: 0,
                            className: "menu-option-toggle-button-label",
                            label: "Bluetooth"
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
    }).hook(bluetooth, self => {
        self.toggleClassName("active", bluetooth.enabled);
    });
}

function BluetoothDeviceList() {
    return Widget.Revealer({
        className: "bluetooth-devices",
        revealChild: opened.bind(),
        transition: "slide_down",
        hexpand: true,
        child: Widget.Scrollable({
            className: "menu-list",
            child: Widget.Box({
                vertical: true,
                className: "bluetooth-device-list menu-option-toggle-list",
                children: bluetooth.bind("devices").as(devices => {
                    // Devices that actually have a name.
                    const _devices = devices.filter(device => device.name);

                    if (_devices.length === 0) {
                        return [
                            Widget.Label({
                                className: "empty-list-label",
                                label: "No devices found"
                            })
                        ];
                    }

                    return _devices.map(BluetoothDevice);
                })
            })
        })
    });
}

function BluetoothDevice(device) {
    return Widget.Box({
        className: "menu-option-toggle-list-item",
        vertical: true,
        children: [
            Widget.Icon({
                className: "bluetooth-item-icon",
                icon: device.bind("icon-name").as(iconName => iconName + "-symbolic")
            }),
            Widget.Label({
                className: "bluetooth-item-label",
                label: device.bind("name"),
                tooltipText: device.bind("name"),
                maxWidthChars: 10
            }),
            Widget.Label({
                label: device.bind("battery_percentage").as(percentage => `${percentage}%`)
            }),
            Widget.Box({
                hexpand: true
            }),
            Widget.Spinner({
                active: device.bind("connecting"),
                visible: device.bind("connecting")
            }),
            Widget.Switch({
                active: device.connected,
                visibile: device.bind("connecting").as(connecting => !connecting),
                setup: self => self.on("notify::active", () => {
                    device.setConnection(self.active);
                })
            })
        ]
    });
}

export default function Bluetooth() {
    return Widget.Box({
        className: "bluetooth",
        vertical: true,
        children: [
            BluetoothToggle(),
            BluetoothDeviceList()
        ]
    });
}
