export default function QuickLock() {
    return Widget.Button({
        className: "menu-action",
        tooltipText: "Quick lock",
        onClicked: () => Utils.execAsync("hyprlock"),
        child: Widget.Icon({
            className: "menu-action-icon",
            icon: "system-lock-screen-symbolic"
        })
    });
}
