export default function IdleInhibitor() {
    return Widget.Button({
        className: "idle-inhibitor-button",
        tooltipText: "Idle inhibitor",
        child: Widget.Label({
            className: "icon idle-inhibitor-icon",
            label: "👁"
        })
    });
}
