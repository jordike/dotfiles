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
                    label: "Volume"
                }),
                endWidget: Widget.Label({
                    xalign: 1,
                    className: "menu-slider-value",
                    label: volume.as(_volume => Math.round(_volume * 100) + "%")
                })
            }),
            slider
        ]
    })
}
