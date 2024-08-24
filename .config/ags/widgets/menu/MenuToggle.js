export default function MenuToggle() {
    return Widget.Button({
        className: "menu-toggle",
        onClicked: () => {
            App.closeWindow("notifications-overview");
            App.toggleWindow("menu");
        },
        child: Widget.Label({
            className: "menu-toggle-icon",
            label: "⋯"
        })
    });
}
