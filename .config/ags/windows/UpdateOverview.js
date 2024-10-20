const pacmanUpdates = Variable([]);
const aurUpdates = Variable([]);

function refreshUpdates() {
    Utils.execAsync("checkupdates").then(updates => {
        pacmanUpdates.value = parseUpdates(updates);
    });

    Utils.execAsync("yay -Qum").then(updates => {
        aurUpdates.value = parseUpdates(updates);
    });
}

function parseUpdates(updates) {
    const lines = updates.split("\n");

    return lines.map(line => {
        const segments = line.split(" ");
        const softwareName = segments[0];
        const oldVersion = segments[1];
        const newVersion = segments[3];

        return {
            name: softwareName,
            oldVersion: oldVersion,
            newVersion: newVersion
        };
    });
}

function UpdateItem(update) {
    return Widget.Box({
        className: "update-overview-list-item",
        spacing: 15,
        children: [
            Widget.Label({
                className: "update-overview-list-item-name",
                label: update.name,
            }),
            Widget.Box({
                hexpand: true,
            }),
            Widget.Label({
                className: "update-overview-list-item-old-version",
                label: update.oldVersion
            }),
            Widget.Label({
                className: "update-overview-list-item-new-version",
                label: update.newVersion
            })
        ]
    });
}

export default function UpdateOverview() {
    Utils.interval(60000, refreshUpdates);

    return Widget.Window({
        name: "update-overview",
        margins: [ 6 ],
        anchor: [ "top", "right" ],
        layer: "top",
        visible: false,
        child: Widget.Box({
            className: "update-overview-container",
            vertical: true,
            children: [
                Widget.CenterBox({
                    startWidget: Widget.Label({
                        className: "update-overview-title",
                        label: "Updates",
                        xalign: 0
                    }),
                    endWidget: Widget.Box({
                        hpack: "end",
                        children: [
                            Widget.Button({
                                className: "update-overview-refresh",
                                onClicked: () => refreshUpdates(),
                                child: Widget.Icon({
                                    className: "update-overview-refresh-icon",
                                    icon: "view-refresh-symbolic"
                                })
                            })
                        ]
                    })
                }),
                Widget.Separator(),
                Widget.Scrollable({
                    className: "update-overview-list-scrollable",
                    hscroll: "never",
                    child: Widget.Box({
                        vertical: true,
                        vexpand: true,
                        hexpand: true,
                        spacing: 8,
                        children: [
                            Widget.Label({
                                className: "update-overview-header",
                                label: pacmanUpdates.bind().as(updates => `Pacman (${updates.length})`),
                                xalign: 0
                            }),
                            Widget.Box({
                                className: "update-overview-list",
                                vertical: true,
                                spacing: 8,
                                children: pacmanUpdates.bind().as(updates => {
                                    if (updates.length === 0) {
                                        return [ 
                                            Widget.Label({
                                                className: "no-updates-label",
                                                label: "There are no updates."
                                            })
                                        ];
                                    }

                                    return updates.map(UpdateItem);
                                })
                            }),
                            Widget.Separator(),
                            Widget.Label({
                                className: "update-overview-header",
                                label: aurUpdates.bind().as(updates => `AUR (${updates.length})`),
                                xalign: 0
                            }),
                            Widget.Box({
                                className: "update-overview-list",
                                vertical: true,
                                spacing: 8,
                                children: aurUpdates.bind().as(updates => {
                                    if (updates.length === 0) {
                                        return [ 
                                            Widget.Label({
                                                className: "no-updates-label",
                                                label: "There are no updates."
                                            })
                                        ];
                                    }

                                    return updates.map(UpdateItem);
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
}
