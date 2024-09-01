import Notification from "../components/Notification.js";

const notifications = await Service.import("notifications");

notifications.popupTimeout = 5_000;

export default function NotificationPopups() {
    const list = Widget.Box({
        className: "notification-popups-list",
        vertical: true,
        children: []
    });

    function onNotified(_, notificationId) {
        if (notifications.dnd) {
            return;
        }

        const notification = notifications.getNotification(notificationId);

        if (notification) {
            list.children = [
                Notification(notification),
                ...list.children
            ];
        }
    }

    function onDismissed(_, notificationId) {
        list.children.find(notification => notification.attribute.id === notificationId)?.destroy();
    }

    list.hook(notifications, onNotified, "notified")
        .hook(notifications, onDismissed, "dismissed");

    return Widget.Window({
        monitor: 0,
        name: "notification-popups",
        anchor: [ "top" ],
        layer: "top",
        visible: true,
        margins: [ 10 ],
        exclusivity: "normal",
        child: Widget.Box({
            css: "min-width: 2px; min-height: 2px;",
            vertical: true,
            child: list
        })
    });
}
