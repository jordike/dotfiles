const divide = ([total, free]) => free / total

const cpu = Variable(0, {
    poll: [5000, 'top -b -n 1', out => divide([100, out.split('\n')
        .find(line => line.includes('Cpu(s)'))
        .split(/\s+/)[1]
        .replace(',', '.')])],
})

export default function Cpu() {
    return Widget.Box({
        className: "system-statistic",
        children: [
            Widget.Icon({
                className: "system-statistic-icon icon",
                icon: "computer-symbolic"
            }),
            Widget.CircularProgress({
                className: "stat-progress",
                label: cpu.bind(),
                startAt: 0.75,
                rounded: false
            })
        ]
    });
}
