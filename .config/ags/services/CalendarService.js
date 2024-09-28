class CalendarService extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "calendar": [ "object", "r" ],
                "hasCalendars": [ "boolean", "r" ]
            }
        );
    }

    #calendars = [];
    #refreshInterval = 60 * 60 * 1000;
    #baseUrl = "https://www.googleapis.com/calendar/v3";

    constructor() {
        super();

        Utils.interval(this.#refreshInterval, () => this.#update());
    }

    async #update() {
        return;

        try {
            await this.#updateCalendar();
            await this.#updateEvents();

            console.log(this.#calendars);
        } catch (error) {
            console.error(error);
        }
    }

    async #updateCalendar() {
        try {
            const calendarsResponse = await Utils.fetch(`${this.#baseUrl}/users/me/calendarList`);

            if (calendarsResponse.statusCode !== 200) {
                return;
            }

            const calendarsJson = await calendarsResponse.json();

            if (calendarsJson.items === undefined || calendarsJson.items.length === 0) {
                return;
            }

            this.#calendars = calendarsJson.items;
        } catch (error) {
            console.error(error);
        }
    }

    async #updateEvents() {
        for (const calendar of this.#calendars) {
            const eventResponse = await Utils.fetch(`${this.#baseUrl}/calendars/${calendar.id}/events`);

            if (eventResponse.statusCode !== 200) {
                return;
            }

            const eventJson = await eventResponse.json();

            if (eventJson.items === undefined || eventJson.items.length === 0) {
                return;
            }

            calendar.events = eventJson.items;
        }
    }

    get calendars() {
        return this.#calendars;
    }

    get hasCalendars() {
        return this.#calendars.length > 0;
    }
}

const calendarService = new CalendarService();

export default calendarService;
