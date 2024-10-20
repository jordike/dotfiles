const mpris = await Service.import("mpris");

function transformTime(length) {
    const minutes = Math.floor(length / 60);
    const seconds = Math.floor(length % 60);
    const displaySeconds = (seconds < 10 ? "0" : "") + seconds;

    return `${minutes}:${displaySeconds}`;
}

function Player(player) {
    return Widget.Box({
        className: "player",
        children: [
            Widget.Box({
                className: "player-image",
                vpack: "start",
                css: player.bind("cover_path").transform(cover => `background-image: url('${cover}')`)
            }),
            Widget.Box({
                vertical: true,
                hexpand: true,
                children: [
                    Widget.Box({
                        children: [
                            Widget.Label({
                                className: "player-title",
                                label: player.trackTitle,
                                tooltipText: player.trackTitle,
                                maxWidthChars: 30,
                                truncate: "end",
                                xalign: 0,
                                hexpand: true,
                            }),
                            Widget.Icon({
                                className: "player-app-icon",
                                hexpand: true,
                                tooltipText: player.identity,
                                icon: player.bind("entry").transform(entry => {
                                    const name = `${entry}-symbolic`;

                                    return Utils.lookUpIcon(name) ? name : "audio-x-generic-symbolic"
                                })
                            })
                        ]
                    }),
                    Widget.Label({
                        className: "player-artist-label",
                        label: player.bind("track_artists").as(artists => artists.join(", ")),
                        maxWidthChars: 24,
                        truncate: "end",
                        xalign: 0,
                        hexpand: true
                    }),
                    Widget.Box({
                        vexpand: true
                    }),
                    Widget.Slider({
                        className: "player-position-slider",
                        drawValue: false,
                        onChange: ({ value }) => player.position = value * player.length,
                        visible: player.bind("length").as(length => length > 0),
                        setup: self => {
                            function updatePosition() {
                                const value = player.position / player.length;

                                self.value = value > 0 ? value : 0;
                            }

                            self.hook(player, updatePosition);
                            self.hook(player, updatePosition, "position");
                            self.poll(1000, updatePosition);
                        }
                    }),
                    Widget.CenterBox({
                        startWidget: Widget.Label({
                            className: "player-position-label",
                            setup: self => {
                                function updateLabel() {
                                    if (player.playBackStatus !== "Playing") {
                                        return;
                                    }

                                    const length = player.position;

                                    self.label = transformTime(length);
                                    self.visible = player.length > 0;
                                }

                                self.hook(player, updateLabel, "position");
                                self.poll(1000, updateLabel);
                            }
                        }),
                        centerWidget: Widget.Box({
                            children: [
                                Widget.Button({
                                    className: "player-previous-button player-button",
                                    onClicked: () => player.previous(),
                                    visible: player.bind("can_go_prev"),
                                    child: Widget.Icon({
                                        icon: "media-skip-backward-symbolic"
                                    })
                                }),
                                Widget.Button({
                                    className: "player-play-pause-button player-button",
                                    onClicked: () => player.playPause(),
                                    visible: player.bind("can_play"),
                                    child: Widget.Icon({
                                        icon: player.bind("play_back_status").transform(status => {
                                            if (status === "Playing") {
                                                return "media-playback-pause-symbolic";
                                            } else {
                                                return "media-playback-start-symbolic";
                                            }
                                        })
                                    })
                                }),
                                Widget.Button({
                                    className: "player-next-button player-button",
                                    onClicked: () => player.next(),
                                    visible: player.bind("can_go_next"),
                                    child: Widget.Icon({
                                        icon: "media-skip-forward-symbolic"
                                    })
                                })
                            ]
                        }),
                        endWidget: Widget.Label({
                            className: "player-length-label",
                            visible: player.bind("length").as(length => length > 0),
                            label: player.bind("length").as(transformTime)
                        })
                    })
                ]
            })
        ]
    });
}

export default function Players() {
    return Widget.Window({
        name: "players",
        visible: false,
        anchor: [ "top", "left" ],
        margins: [ 6 ],
        child: Widget.Box({
            className: "players-container",
            vertical: true,
            children: [
                Widget.Label({
                    className: "players-title",
                    label: "Players",
                    xalign: 0
                }),
                Widget.Separator(),
                // Widget.Scrollable({
                //     css: "min-width: 400px; min-height: 600px",
                    /* child: */Widget.Box({
                        className: "players-list",
                        vertical: true,
                        children: mpris.bind("players").as(players => players.map(Player))
                    })
                // })
            ]
        })
    });
}
