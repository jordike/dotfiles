import Separator from "./Separator.js";

function NotificationIcon({ app_entry, app_icon, image }) {
    if (image) {
        return Widget.Box({
            css: `background-image: url("${image}");`
                + "background-size: contain;"
                + "background-repeat: no-repeat;"
                + "background-position: center;",
        });
    }

    let icon = "dialog-information-symbolic";

    if (Utils.lookUpIcon(app_icon)) {
        icon = app_icon;
    }

    if (app_entry && Utils.lookUpIcon(app_entry)) {
        icon = app_entry;
    }

    return Widget.Box({
        child: Widget.Icon(icon),
    });
}

export default function Notification(notification) {
    let time = new Date(0);
    time.setUTCSeconds(notification.time);

    function timeFormat(number) {
        return number < 10 ? `0${number}` : number;
    }

    const timeLabel = `${timeFormat(time.getHours())}:${timeFormat(time.getMinutes())}`;
    const timeTooltip = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()} ${timeFormat(time.getHours())}:${timeFormat(time.getMinutes())}:${timeFormat(time.getSeconds())}`;

    return Widget.EventBox({
        onPrimaryClick: () => notification.dismiss(),
        attribute: {
            id: notification.id
        },
        child: Widget.Box({
            className: "notification",
            children: [
                Widget.Box({
                    className: "notification-icon",
                    child: NotificationIcon(notification)
                }),
                Widget.Box({
                    className: "notification-content",
                    vertical: true,
                    children: [
                        Widget.Box({
                            className: "notification-header",
                            hexpand: true,
                            children: [
                                Widget.Label({
                                    className: "notification-title",
                                    hexpand: true,
                                    xalign: 0,
                                    maxWidthChars: 24,
                                    truncate: "end",
                                    wrap: true,
                                    justification: "left",
                                    label: notification.summary.trim(),
                                    tooltipText: notification.summary.trim()
                                }),
                                Separator(),
                                Widget.Label({
                                    className: "notification-time",
                                    label: timeLabel,
                                    tooltipText: timeTooltip
                                }),
                                Separator(),
                                Widget.Button({
                                    className: "notification-close",
                                    onClicked: () => notification.close(),
                                    child: Widget.Label({
                                        label: "X"
                                    })
                                })
                            ]
                        }),
                        Widget.Label({
                            className: "notification-body",
                            label: notification.body,
                            justification: "left",
                            wrap: true,
                            xalign: 0,
                            useMarkup: true
                        }),
                        Widget.Box({
                            className: "notification-actions",
                            hexpand: true,
                            children: notification.actions.map(action => {
                                return Widget.Box({
                                    child: Widget.Button({
                                        className: "notification-action",
                                        onClicked: () => {
                                            notification.invoke(action.id);
                                            notification.close();
                                        },
                                        child: Widget.Label({
                                            label: action.label
                                        })
                                    })
                                });
                            })
                        })
                    ]
                })
            ]
        })
    });
}
