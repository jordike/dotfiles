import Separator from "../components/Separator.js";

const time = Variable("", {
    poll: [1000, 'date "+%H:%M"']
});

const fullTime = Variable("", {
    poll: [1000, 'date "+%H:%M:%S"']
});

const date = Variable("", {
    poll: [1000, 'date "+%e %b %Y"']
});

export default function Clock() {
    return Widget.Button({
        onClicked: () => App.toggleWindow("calendar"),
        child: Widget.Box({
            className: "clock",
            tooltipText: fullTime.bind(),
            children: [
                Widget.Label({
                    className: "time",
                    label: time.bind(),
                }),
                Separator(),
                Widget.Label({
                    className: "date",
                    label: date.bind()
                })
            ],
        })
    });
}
