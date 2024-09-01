export default function NextEvent() {
    return Widget.Box({
        className: "next-event",
        children: [
            Widget.Label({
                className: "next-event-icon",
                label: "📅 "
            }),
            Widget.Label({
                className: "next-event-label",
                label: "NextEvent"
            })
        ]
    });
}
