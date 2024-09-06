const notifications = await Service.import("notifications")

export default function Notifications() {
    return Widget.Button({
        onClicked: () => {
            App.closeWindow("menu");
            App.toggleWindow("notifications-overview");
        },
        child: Widget.Box({
            className: "notifications-toggle",
            children: [
                Widget.Label({
                    className: "icon notifications-icon",
                    label: "📰 "
                }),
                Widget.Label({
                    className: "notifications-counter",
                    label: notifications.bind("notifications").as(notificationsList => notificationsList.length.toString())
                })
            ]
        })
    });
}
