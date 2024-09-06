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
                Widget.Scrollable({
                    className: "notifications-container",
                    hscroll: "never",
                    vscroll: "automatic",
                    css:"min-height: 600px; min-width: 365px",
                    child: Widget.Box({
                        vertical: true,
                        children: [
                            Widget.Label({
                                className: "no-notifications-label",
                                visible: notifications.as(notifications => notifications.length === 0),
                                label: "There are no notifications"
                            }),
                            Widget.Box({
                                vertical: true,
                                className: "notifications-list",
                                children: notifications.as(notifications => [
                                    ...notifications.map(Notification)
                                ]),
                            })
                        ]
                    })
                }),
                Widget.Separator(),
                Widget.Box({
                    className: "notifications-toggles",
                    children: [
                        Widget.Switch({
                            className: "dnd-switch"
                        })
                            .on("notify::active", self => notificationsService.dnd = self.active)
                            .hook(notificationsService, self => {
                                self.active = notificationsService.dnd;
                                self.toggleClassName("active", self.active);
                            }),
                        Widget.Label({
                            className: "dnd-label",
                            label: "Do not disturb"
                        })
                    ]
                })
            ]
        })
    });
}
