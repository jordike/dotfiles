const notifications = await Service.import("notifications");
import Notification from "../components/Notification.js";

export default function NotificationOverview() {
    return Widget.Window({
        visible: false,
        name: "notifications-overview",
        anchor: [ "top", "right" ],
        layer: "top",
        margins: [
            6
        ],
        child: Widget.Box({
            vertical: true,
            children: [
                Widget.CenterBox({
                    start_widget: Widget.Label({
                        className: "notifications-title",
                        label: "Notifications"
                    }),
                    end_widget: Widget.Button({
                        className: "notifications-clear-all",
                        child: Widget.Label({
                            className: "notifications-clear-all-label",
                            label: "Clear all"
                        })
                    })
                }),
                Widget.Separator(),
                // Widget.Label({
                //     className: "no-notifications-label",
                //     visible: notifications.bind("notifications").as(notifications => notifications.length === 0),
                //     label: "There are no notifications."
                // }),
                Widget.Scrollable({
                    className: "notifications-container",
                    hscroll: "never",
                    vscroll: "automatic",
                    css:"min-height: 600px; min-width: 300px",
                    child: Widget.Box({
                        vertical: true,
                        className: "notifications-list",
                        children: notifications.bind("notifications").as(notifications => notifications.map(Notification)),
                    })
                })
            ]
        })
    });
}
