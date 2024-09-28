const tray = await Service.import("systemtray");

function TrayItem(item) {
    return Widget.Button({
        className: "system-tray-item",
        child: Widget.Icon({
            className: "system-tray-item-icon"
        }).bind("icon", item, "icon"),
        tooltipMarkup: item.bind("tooltip_markup"),
        onPrimaryClick: (_, event) => item.activate(event),
        onSecondaryClick: (_, event) => item.openMenu(event)
    })
}

export default function SystemTray() {
    return Widget.Box({
        className: "system-tray",
        children: tray.bind("items").as(items => items.map(TrayItem))
    });
}
