import brightnessService from "../../services/BrightnessService.js";

export default function Brightness() {
    const brightness = brightnessService.bind("screenValue");

    const slider = Widget.Slider({
        className: "menu-slider-slider",
        onChange: ({ value }) => brightnessService.screenValue = value / 100,
        value: brightness.as(_brightness => _brightness * 100),
        min: 0,
        max: 100,
        hexpand: true,
        drawValue: false,
    });
    slider.set_show_fill_level(true);

    return Widget.Box({
        className: "menu-slider",
        hexpand: true,
        vertical: true,
        children: [
            Widget.CenterBox({
                startWidget: Widget.Label({
                    className: "menu-slider-label",
                    xalign: 0,
                    label: "Brightness"
                }),
                endWidget: Widget.Label({
                    xalign: 1,
                    className: "menu-slider-value",
                    label: brightness.as(_brightness => Math.round(_brightness * 100) + "%")
                })
            }),
            slider
        ]
    })
}
