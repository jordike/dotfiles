const mpris = await Service.import("mpris");

function getPlayer() {
    const players = mpris.players.filter(player => player.playBackStatus === "Playing");

    if (players.length === 0) {
        return null;
    }

    const spotify = players.find(player => player.identity === "Spotify");

    return spotify ?? players[0];
}

export default function NowPlaying() {
    return Widget.Box({
        className: "now-playing",
        child: Widget.Button({
            onClicked: () => App.toggleWindow("players"),
            child: Widget.Box({
                children: [
                    Widget.Icon({
                        className: "now-playing-icon"
                    }).hook(mpris, self => {
                        const player = getPlayer();

                        if (player !== null) {
                            const hasIcon = Utils.lookUpIcon(player.entry + "-symbolic");

                            self.icon = hasIcon ? player.entry + "-symbolic" : "audio-x-generic-symbolic";
                        }
                    }, "changed"),
                    Widget.Label({
                        className: "now-playing-label",
                        maxWidthChars: 24,
                        truncate: "end",
                    }).hook(mpris, self => {
                        const player = getPlayer();

                        if (player !== null) {
                            const artistTitle = player.trackArtists.join(", ");
                            const displayTitle = `${artistTitle} - ${player.trackTitle}`;

                            self.label = displayTitle;
                            self.tooltipText = displayTitle;
                        }
                    }, "changed")
                ]
            })
        })
    })
}
