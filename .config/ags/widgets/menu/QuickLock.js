export default function QuickLock() {
    return Widget.Button({
        className: "quick-lock",
        onClicked: () => Utils.execAsync("hyprlock"),
        label: "🔒"
    });
}
