const notificationsService = await Service.import("notifications")

export default function Notifications() {
    const notifications = notificationsService.bind("notifications");

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
                    label: notifications.as(notificationsList => notificationsList.length.toString()),
                    tooltipText: notifications.as(notificationsList => `You have ${notificationsList.length} ${notificationsList.length > 1 ? "notifications" : "notification"}`)
                })
            ]
        })
    });
}
