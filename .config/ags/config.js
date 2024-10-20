import Calendar from "./windows/Calendar.js";
import Menu from "./windows/Menu.js";
import NotificationOverview from "./windows/NotificationOverview.js";
import NotificationPopups from "./windows/NotificationPopups.js";
import Players from "./windows/Players.js";
import TopBar from "./windows/TopBar.js";
import UpdateOverview from "./windows/UpdateOverview.js";
import VolumeChange from "./windows/VolumeChange.js";
import WeatherOverview from "./windows/WeatherOverview.js";

App.config({
	windows: [
        TopBar(),
        NotificationPopups(),
        NotificationOverview(),
        Menu(),
        Calendar(),
        Players(),
        VolumeChange(),
        WeatherOverview(),
        UpdateOverview()
	],
    onWindowToggled: (windowName, visible) => {
        if (!visible) {
            return;
        }

        App.windows
            .filter(window => window.name !== windowName && !window.attribute?.alwaysOpen)
            .forEach(window => App.closeWindow(window.name));
    },
    onConfigParsed: (_) => {
        function compileSass() {
            const scss = `${App.configDir}/style/style.scss`;
            const css = `/tmp/ags/ags-style.css`;

            Utils.exec(`sass -I /home/jordi/.cache/wal --no-source-map ${scss} ${css}`);

            App.resetCss();
            App.applyCss(css);
        }

        compileSass();

        Utils.monitorFile(`${App.configDir}/style`, compileSass);
        Utils.monitorFile("/home/jordi/.cache/wal/colors-ags.scss", compileSass);
    }
});
