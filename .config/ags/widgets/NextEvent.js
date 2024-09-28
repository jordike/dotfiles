import Separator from "../components/Separator.js";

export default function NextEvent() {
    return Widget.Box({
        className: "next-event",
        children: [
            Widget.Icon({
                className: "icon next-event-icon",
                icon: "x-office-calendar-symbolic"
            }),
            Widget.Box({
                children: [
                    Widget.Label({
                        className: "next-event-label",
                        label: "Test"
                    }),
                    Separator(),
                    Widget.Label({
                        className: "next-event-timer",
                        label: "15:32:43"
                    })
                ]
            })
        ]
    });
}
