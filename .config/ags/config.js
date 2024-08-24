import Calendar from "./windows/Calendar.js";
import Menu from "./windows/Menu.js";
import NotificationOverview from "./windows/NotificationOverview.js";
import TopBar from "./windows/TopBar.js";

App.config({
    style: "./style/style.css",
	windows: [
        TopBar(),
        NotificationOverview(),
        Menu(),
        Calendar()
	]
});
