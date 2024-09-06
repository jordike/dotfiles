const timeCommand = 'date "+%H:%M"';

const localDate = Variable("");
const localTime = Variable("");
const londonTime = Variable("");
const newYorkTime = Variable("");
const moscowTime = Variable("");
const tokyoTime = Variable("");
const losAngelesTime = Variable("");

function ForeignTimezone(label, time) {
    return Widget.Box({
        className: "foreign-timezone",
        vertical: true,
        children: [
            Widget.Label({
                className: "foreign-timezone-label",
                label: label
            }),
            Widget.Label({
                className: "foreign-timezone-time",
                label: time.bind()
            })
        ]
    });
}

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

    Utils.interval(1000, () => {
        localDate.value = Utils.exec('date "+%e %B %Y"');
        localTime.value = Utils.exec('date "+%H:%M:%S"');
        londonTime.value = Utils.exec(`bash -c "TZ=Europe/London ${timeCommand}"`);
        newYorkTime.value = Utils.exec(`bash -c "TZ=America/New_York ${timeCommand}"`);
        moscowTime.value = Utils.exec(`bash -c "TZ=Europe/Moscow ${timeCommand}"`);
        tokyoTime.value = Utils.exec(`bash -c "TZ=Asia/Tokyo ${timeCommand}"`);
        losAngelesTime.value = Utils.exec(`bash -c "TZ=America/Los_Angeles ${timeCommand}"`);
    }, calendar);

    return Widget.Window({
        name: "calendar",
        className: "calendar-window",
        anchor: [ "top" ],
        layer: "top",
        margins: [ 6, 0, 0, 0 ],
        visible: false,
        child: Widget.Box({
            children: [
                Widget.Box({
                    className: "timezones",
                    vertical: true,
                    children: [
                        Widget.Box({
                            className: "current-timezone",
                            vertical: true,
                            css: "background-color: transparent",
                            children: [
                                Widget.Label({
                                    className: "calendar-time",
                                    label: localTime.bind()
                                }),
                                Widget.Label({
                                    className: "calendar-date",
                                    label: localDate.bind()
                                }),
                            ]
                        }),
                        Widget.Separator({
                            orientation: 0
                        }),
                        Widget.Box({
                            className: "foreign-timezones",
                            vertical: true,
                            children: [
                                ForeignTimezone("Los Angeles", losAngelesTime),
                                ForeignTimezone("New York", newYorkTime),
                                ForeignTimezone("London", londonTime),
                                ForeignTimezone("Moscow", moscowTime),
                                ForeignTimezone("Tokyo", tokyoTime)
                            ]
                        })
                    ]
                }),
                Widget.Box({
                    vertical: true,
                    children: [
                        Widget.Box({
                            className: "calendar-button-row",
                            child: Widget.Button({
                                className: "calendar-today-button",
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
            ]
        })
    });
}
