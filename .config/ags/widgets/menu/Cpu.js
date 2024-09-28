const cpu = Variable("", {
    poll: [5000, "/home/jordi/.config/hypr/scripts/cpu_usage.sh"]
});

function formatCpuUsage(usage) {
    const usageNumber = parseInt(usage);

    return `${usageNumber.toFixed(1)}%`;
}

export default function Cpu() {
    return Widget.Box({
        className: "system-statistic",
        children: [
            Widget.Icon({
                className: "system-statistic-icon icon",
                icon: "computer-symbolic"
            }),
            Widget.Label({
                className: "system-statistic-label",
                label: cpu.bind().as(usage => formatCpuUsage(usage))
            })
        ]
    });
}
