function isMasterLayout() {
    const response = Utils.exec("hyprctl getoption general:layout");
    
    return response.includes("master");
}

function setLayout(layout) {
    Utils.execAsync(`hyprctl keyword general:layout ${layout}`);
    Utils.execAsync(`notify-send "Layout mode changed" "Layout mode has been changed to '${layout}'."`);
}

function toggleLayout() {
    if (isMasterLayout()) {
        setLayout("dwindle");
    } else {
        setLayout("master");
    }
}

export default function ToggleLayoutMode() {
    return Widget.Button({
        className: "menu-action active",
        tooltipText: "Toggle layout mode",
        onClicked: toggleLayout,
        child: Widget.Icon({
            className: "menu-action-icon",
            icon: "view-grid-symbolic",
        })
    });
}
