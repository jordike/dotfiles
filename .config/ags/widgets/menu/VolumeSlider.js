const audio = await Service.import("audio");

export default function VolumeSlider() {
    const volume = audio.speaker.bind("volume");
    
    const slider = Widget.Slider({
        className: "menu-slider-slider",
        onChange: ({ value }) => audio.speaker.volume = value / 100,
        value: volume.as(_volume => _volume * 100),
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
        ]
    });
    slider.set_show_fill_level(true);

    return Widget.Box({
        className: "menu-slider",
        children: [
            Widget.Label({
                className: "menu-slider-label",
                label: volume.as(_volume => Math.round(_volume * 100).toString() + "%")
            }),
            slider
        ]
    })
}
