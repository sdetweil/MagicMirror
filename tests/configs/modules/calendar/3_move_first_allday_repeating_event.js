let config = {
	timeFormat: 24,
	units: "metric",
	modules: [
		{
			module: "calendar",
			position: "bottom_bar",
			config: {
				fade: false,
				hideDuplicates: false,
				maximumEntries: 100,
				urgency: 0,
				dateFormat: "Do.MMM, HH:mm",
				fullDayEventDateFormat: "Do.MMM",
				timeFormat: "absolute",
				getRelative: 0,
				maximumNumberOfDays: 28,
				calendars: [
					{
						maximumEntries: 100,
						url: "http://localhost:8080/tests/mocks/3_move_first_allday_repeating_event.ics"
					}
				]
			}
		}
	]
};

Date.now = () => {
	return new Date("01 Oct 2024 10:38:00 GMT+2:00").valueOf();
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = config;
}
