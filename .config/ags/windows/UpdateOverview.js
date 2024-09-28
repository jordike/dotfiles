const pacmanUpdates = Variable([]);
const aurUpdates = Variable([]);
const updatingCounter = Variable(0);

function refreshUpdates() {
    updatingCounter.value += 2;

    Utils.execAsync("checkupdates").then(updates => {
        pacmanUpdates.value = parseUpdates(updates);
        updatingCounter.value--;
    });

    Utils.execAsync("yay -Qum").then(updates => {
        aurUpdates.value = parseUpdates(updates);
        updatingCounter.value--;
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
    return Widget.CenterBox({
        className: "update-overview-list-item",
        children: [
            Widget.Label({
                className: "update-overview-list-item-name",
                label: update.name,
                tooltipText: update.name,
            }),
            Widget.Box({
                hexpand: true
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
                            Widget.Spinner({
                                active: updatingCounter.bind().as(counter => counter > 0),
                                visible: updatingCounter.bind().as(counter => counter > 0)
                            }),
                            Widget.Button({
                                className: "update-overview-refresh",
                                onClicked: () => refreshUpdates(),
                                visible: updatingCounter.bind().as(counter => counter === 0),
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
                    child: Widget.Box({
                        vertical: true,
                        vexpand: true,
                        hexpand: true,
                        children: [
                            Widget.Label({
                                className: "update-overview-header",
                                label: "Pacman",
                                xalign: 0
                            }),
                            Widget.Box({
                                className: "update-overview-list",
                                vertical: true,
                                children: pacmanUpdates.bind().as(updates => updates.map(UpdateItem))
                            }),
                            Widget.Separator(),
                            Widget.Label({
                                className: "update-overview-header",
                                label: "AUR",
                                xalign: 0
                            }),
                            Widget.Box({
                                className: "update-overview-list",
                                vertical: true,
                                children: aurUpdates.bind().as(updates => updates.map(UpdateItem))
                            })
                        ]
                    })
                })
            ]
        })
    });
}
