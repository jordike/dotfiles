import Calendar from "./windows/Calendar.js";
import Menu from "./windows/Menu.js";
import NotificationOverview from "./windows/NotificationOverview.js";
import NotificationPopups from "./windows/NotificationPopups.js";
import TopBar from "./windows/TopBar.js";
import WeatherOverview from "./windows/WeatherOverview.js";

App.config({
    // style: "./style/style.css",
	windows: [
        TopBar(),
        NotificationPopups(),
        NotificationOverview(),
        Menu(),
        Calendar(),
        // WeatherOverview()
	]
});

App.connect("window-toggled", (_, windowName, visible) => {
    if (!visible) {
        return;
    }

    App.windows
        .filter(window => window.name !== windowName && window.name !== "top_bar" && window.name !== "notification-popups")
        .forEach(window => App.closeWindow(window.name));
});

function compileSass() {
    const scss = `${App.configDir}/style/style.scss`;
    const css = `/tmp/ags-style.css`;

    Utils.exec(`sass -I /home/jordi/.cache/wal --no-source-map ${scss} ${css}`);

    App.resetCss();
    App.applyCss(css);
}

compileSass();

Utils.monitorFile(`${App.configDir}/style`, compileSass);
Utils.monitorFile("/home/jordi/.cache/wal/colors-ags.scss", compileSass);
