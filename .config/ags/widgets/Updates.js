import Separator from "../components/Separator.js";

const updateInterval = 1000 * 60 * 10; // 10 minutes

function PacmanUpdateCounter() {
    return Widget.Box({
        className: "pacman-updates",
        tooltipText: "Pacman updates",
        children: [
            Widget.Label({
                name: "pacman-icon",
                className: "updates-icon",
                label: "📦 "
            }),
            Widget.Label()
                .poll(updateInterval, self => {
                    self.label = Utils.exec('bash -c "checkupdates | wc -l"');
                })
        ]
    });
}

function AurUpdateCounter() {
    return Widget.Box({
        className: "aur-updates",
        tooltipText: "AUR updates",
        children: [
            Widget.Label({
                name: "aur-icon",
                className: "updates-icon",
                label: "🚚 "
            }),
            Widget.Label()
                .poll(updateInterval, self => {
                    self.label = Utils.exec('bash -c "yay -Qum 2>/dev/null | wc -l"');
                })
        ]
    });
}

export default function Updates() {
    return Widget.Box({
        className: "update-counters",
        children: [
            PacmanUpdateCounter(),
            Separator(),
            AurUpdateCounter()
        ]
    });
}
