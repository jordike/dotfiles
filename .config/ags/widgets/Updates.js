const pacmanUpdateCounter = Variable(0);
const aurUpdateCounter = Variable(0);
const totalCounter = Variable(0);
const tooltip = Variable("");

const refreshInterval = 10 * 60 * 1000;

function updateTotalCounter() {
    totalCounter.value = pacmanUpdateCounter.value + aurUpdateCounter.value;
    tooltip.value = `Pacman updates:\t${pacmanUpdateCounter.value.toString()}\nAUR updates:\t${aurUpdateCounter.value.toString()}`;
}

function updateCounters() {
    Utils.execAsync('bash -c "checkupdates | wc -l"')
        .then(counter => {
            pacmanUpdateCounter.value = parseInt(counter);
            updateTotalCounter();
        })
        .catch(exception => console.error(exception));

    Utils.execAsync('bash -c "yay -Qum 2>/dev/null | wc -l"')
        .then(counter => {
            aurUpdateCounter.value = parseInt(counter);
            updateTotalCounter();
        })
        .catch(exception => console.error(exception));
}

export default function Updates() {
    Utils.interval(refreshInterval, updateCounters);

    updateCounters();

    return Widget.Button({
        onClicked: () => App.toggleWindow("update-overview"),
        child: Widget.Box({
            className: "update-counters",
            tooltipText: tooltip.bind(),
            children: [
                Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "icon updates-icon",
                            icon: "software-update-available-symbolic"
                        }),
                        Widget.Label({
                            label: totalCounter.bind().as(counter => counter.toString())
                        })
                    ]
                })
            ]
        })
    });
}
