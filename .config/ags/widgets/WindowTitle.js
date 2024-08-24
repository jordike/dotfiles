const hyprland = await Service.import("hyprland")

export default function WindowTitle() {
    const windowTitle = hyprland.active.client.bind("title");

    return Widget.Label({
        class_name: "window_title",
        label: windowTitle,
        tooltipText: windowTitle,
        max_width_chars: 35,
        truncate: "end"
    });
}
