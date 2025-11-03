/**
 * Schedule the timer for the next update
 * @param {object} timer The timer of the module
 * @param {bigint} intervalMS interval in milliseconds
 * @param {Promise} callback function to call when the timer expires
 */
const scheduleTimer = function (timer, intervalMS, callback) {
	if (process.env.mmTestMode !== "true") {
		// only set timer when not running in test mode
		let tmr = timer;
		clearTimeout(tmr);
		tmr = setTimeout(function () {
			callback();
		}, intervalMS);
	}
};

module.exports = { scheduleTimer };
