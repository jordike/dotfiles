const audio = await Service.import("audio");

export default function VolumeSlider() {
    const volume = audio.speaker.bind("volume");

    return Widget.Box({
        children: [
            Widget.Label({
                label: volume.as(_volume => Math.round(_volume * 100).toString() + "%")
            }),
            Widget.LevelBar({
                // maxValue: 100,
                // minValue: 0,
                // widthRequest: 100,
                value: volume.as(_volume => _volume * 100)
            })
        ]
    })
}
