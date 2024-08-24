export default function Calendar() {
    const calendar = Widget.Calendar({
        className: "calendar",
        showDayNames: true,
        showDetails: true,
        showHeading: true,
        showWeekNumbers: true,
        hexpand: true,
        vpack: "center"
    });

    return Widget.Window({
        name: "calendar",
        className: "calendar-window",
        anchor: [ "top" ],
        layer: "top",
        margins: [ 6, 0, 0, 0 ],
        visible: false,
        child: Widget.Box({
            vertical: true,
            children: [
                Widget.CenterBox({
                    start_widget: Widget.Label({
                        className: "calendar-title",
                        label: "Calendar"
                    }),
                    end_widget: Widget.Button({
                        onClicked: () => {
                            const today = new Date(Date.now());

                            calendar.select_month(today.getMonth(), today.getFullYear());
                            calendar.select_day(today.getDate());
                        },
                        child: Widget.Label({
                            label: "Today"
                        })
                    })
                }),
                calendar
            ]
        })
    });
}
