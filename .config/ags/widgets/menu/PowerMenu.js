export default function PowerMenu() {
    return Widget.Button({
        className: "menu-action",
        tooltipText: "Power menu",
        onClicked: () => Utils.execAsync("wlogout"),
        child: Widget.Icon({
            className: "menu-action-icon",
            icon: "system-shutdown-symbolic"
        })
    });
}
