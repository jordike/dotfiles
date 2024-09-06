export default function PowerMenu() {
    return Widget.Button({
        class_name: "power",
        child: Widget.Label({
            className: "icon power-button",
            label: "⏻ "
        }),
        onClicked: () => Utils.execAsync("wlogout")
    });
}
