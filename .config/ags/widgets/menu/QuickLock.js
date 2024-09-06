export default function QuickLock() {
    return Widget.Button({
        className: "quick-lock",
        tooltipText: "Quick lock",
        onClicked: () => Utils.execAsync("hyprlock"),
        child: Widget.Label({
            className: "icon quick-lock-icon",
            label: "🔒"
        })
    });
}
