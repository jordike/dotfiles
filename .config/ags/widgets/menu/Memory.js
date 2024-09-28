const memoryFree = Variable("");
const memoryAvailable = Variable("");

function updateMemory() {
    const memoryOutput = Utils.exec("cat /proc/meminfo");
    const lines = memoryOutput.split("\n");

    const memoryFreeKb = lines[1].match(/\d+/)[0];
    const memoryAvailableKb = lines[2].match(/\d+/)[0];

    memoryFree.value = memoryFreeKb;
    memoryAvailable.value = memoryAvailableKb;
}

function convertKbToGb(kilobytes) {
    return (kilobytes / 1_000_000).toFixed(2);
}

export default function Memory() {
    setInterval(updateMemory, 5000);

    return Widget.Box({
        className: "system-statistic",
        children: [
            Widget.Icon({
                className: "system-statistic-icon icon",
                icon: "drive-harddisk-symbolic",
            }),
            Widget.Box({
                className: "system-statistic-label",
                children: [
                    Widget.Label({
                        label: memoryFree.bind().as(memoryFreeKb => `${convertKbToGb(parseInt(memoryFreeKb))} GB`),
                        tooltipText: memoryFree.bind().as(memoryFreeKb => `Memory free: ${memoryFreeKb} KB`)
                    }),
                    Widget.Label({
                        className: "system-statistic-label-separator",
                        label: "/"
                    }),
                    Widget.Label({
                        label: memoryAvailable.bind().as(memoryAvailableKb => `${convertKbToGb(parseInt(memoryAvailableKb))} GB`),
                        tooltipText: memoryAvailable.bind().as(memoryAvailableKb => `Memory available: ${memoryAvailableKb} KB`)
                    })
                ]
            })
        ]
    })
}
