export default function Settings() {
    return Widget.Button({
        className: "icon settings-button",
        tooltipText: "Settings",
        child: Widget.Label({
            className: "icon settings-button-icon",
            label: "⚙"
        })
    });
}
