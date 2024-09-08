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
        marks: [
            [ 0, "0%" ],
            [ 25, "25%" ],
            [ 50, "50%" ],
            [ 75, "75%" ],
            [ 100, "100%" ]
        ],
    });
    slider.set_show_fill_level(true);

    return Widget.Box({
        className: "menu-slider",
        children: [
            Widget.Label({
                className: "menu-slider-label",
                label: brightness.as(brightness => `${Math.round(brightness * 100)}%`)
            }),
            slider
        ]
    })
}
