import Notification from "../components/Notification.js";

const notificationsService = await Service.import("notifications");
const notifications = notificationsService.bind("notifications");

export default function NotificationOverview() {
    return Widget.Window({
        visible: false,
        name: "notifications-overview",
        anchor: [ "top", "right" ],
        layer: "top",
        margins: [ 6 ],
        child: Widget.Box({
            vertical: true,
            children: [
                Widget.Box({
                    className: "notifications-header",
                    hexpand: true,
                    children: [
                        Widget.Label({
                            hexpand: true,
                            className: "notifications-title",
                            label: "Notifications",
                            justification: "left",
                            xalign: 0
                        }),
                        Widget.Button({
                            className: "notifications-clear-all",
                            onClicked: () => {
                                for (const notification of notificationsService.notifications) {
                                    notification.close();
                                }
                            },
                            child: Widget.Label({
                                className: "notifications-clear-all-label",
                                label: "Clear all"
                            })
                        })
                    ]
                }),
                Widget.Separator(),
                Widget.Label({
                    className: "no-notifications-label",
                    visible: notifications.as(notifications => notifications.length === 0),
                    label: "There are no notifications."
                }),
                Widget.Scrollable({
                    className: "notifications-container",
                    hscroll: "never",
                    vscroll: "automatic",
                    css:"min-height: 600px; min-width: 300px",
                    child: Widget.Box({
                        vertical: true,
                        className: "notifications-list",
                        children: notifications.as(notifications => notifications.map(Notification)),
                    })
                })
            ]
        })
    });
}
