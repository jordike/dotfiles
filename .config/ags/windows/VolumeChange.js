const audio = await Service.import("audio");
const changeCounter = Variable(0);

export default function VolumeChange() {
    let lastVolume = null;

    return Widget.Window({
        name: "volume-change",
        margins: [ 6 ],
        anchor: [ "right" ],
        layer: "overlay",
        exclusivity: "ignore",
        visible: changeCounter.bind().as(_counter => _counter > 0),
        attribute: {
            alwaysOpen: true
        },
        child: Widget.Box({
            className: "volume-change-container",
            vertical: true,
            children: [
                Widget.Label({
                    className: "volume-change-label",
                    label: audio.speaker.bind("volume").as(volume => Math.round(volume * 100) + "%")
                }),
                Widget.Slider({
                    className: "volume-change-container-slider",
                    onChange: ({ value }) => audio.speaker.volume = value / 100,
                    value: audio.speaker.bind("volume").as(volume => volume * 100),
                    min: 0,
                    max: 100,
                    drawValue: false,
                    vertical: true,
                    vexpand: true,
                    inverted: true,
                    hpack: "fill",
                    vpack: "end"
                })
            ]
        })
    }).hook(audio.speaker, _ => {
        if (lastVolume === null) {
            lastVolume = audio.speaker.volume;
        }

        if (audio.speaker.volume != lastVolume) {
            lastVolume = audio.speaker.volume;
            changeCounter.value++;

            setTimeout(() => changeCounter.value--, 5000);
        }
    });
}
