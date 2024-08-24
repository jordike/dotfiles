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
    const icon = Widget.Box({
        vpack: "start",
        className: "notification-icon",
        child: NotificationIcon(notification),
    });

    const title = Widget.Label({
        className: "notification-title",
        xalign: 0,
        justification: "left",
        hexpand: true,
        maxWidthChars: 24,
        truncate: "end",
        wrap: true,
        label: notification.summary,
        useMarkup: true,
        tooltipText: notification.summary
    });

    const body = Widget.Label({
        className: "notification-body",
        hexpand: true,
        useMarkup: true,
        xalign: 0,
        justification: "left",
        label: notification.body,
        wrap: true,
    });

    const actions = Widget.Box({
        className: "actions",
        children: notification.actions.map(({ id, label }) => Widget.Button({
            className: "action-button",
            onClicked: () => {
                notification.invoke(id);
                notification.close();
            },
            hexpand: true,
            child: Widget.Label({
                label: label
            }),
        })),
    });

    return Widget.Box({
        className: `notification ${notification.urgency}`,
        vertical: true,
        children: [
            Widget.Box({
                children: [
                    icon,
                    Widget.Box({
                        vertical: true,
                        children: [
                            title,
                            body,
                        ]
                    })
                ]
            }),
            actions,
        ]
    });
}
