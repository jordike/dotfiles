export default function Settings() {
    return Widget.Button({
        className: "menu-action",
        tooltipText: "Settings",
        child: Widget.Icon({
            className: "menu-action-icon",
            icon: "emblem-system-symbolic"
        })
    });
}
