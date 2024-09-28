export default function IdleInhibitor() {
    return Widget.Button({
        className: "menu-action",
        tooltipText: "Idle inhibitor",
        child: Widget.Label({
            className: "menu-action-icon",
            label: "👁"
        })
    });
}
