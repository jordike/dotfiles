const audio = await Service.import("audio")

export default function Volume() {
    return Widget.EventBox({
        onScrollUp: () => Utils.exec("wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%+"),
        onScrollDown: () => Utils.exec("wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%-"),
        child: Widget.Button({
            onClicked: () => Utils.execAsync("pavucontrol"),
            child: Widget.Box({
                className: "volume",
                children: [
                    Widget.Icon({
                        className: "icon volume-icon"
                    }).hook(audio.speaker, self => {
                        const icon = [
                            [101, 'overamplified'],
                            [67, 'high'],
                            [34, 'medium'],
                            [1, 'low'],
                            [0, 'muted'],
                        ].find(([threshold]) => threshold <= audio.speaker.volume * 100)?.[1];

                        self.icon = `audio-volume-${audio.speaker.is_muted ? "muted" : icon}-symbolic`;
                    }),
                    Widget.Label({
                        className: "volume-percentage",
                        label: audio.speaker.bind("volume").as(volume => ` ${Math.round(volume * 100).toString()}%`)
                    })
                ]
            })
        })
    });
}
