const divide = ([total, free]) => free / total;

const ram = Variable(0, {
    poll: [5000, 'free', out => divide(out.split('\n')
        .find(line => line.includes('Mem:'))
        .split(/\s+/)
        .splice(1, 2))],
});

export default function Memory() {
    return Widget.Box({
        className: "system-statistic",
        children: [
            Widget.Icon({
                className: "system-statistic-icon icon",
                icon: "drive-harddisk-symbolic",
            }),
            Widget.CircularProgress({
                className: "stat-progress",
                value: ram.bind(),
                startAt: 0.75,
                rounded: false
            })
        ]
    })
}
