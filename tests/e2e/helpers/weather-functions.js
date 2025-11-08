const { injectMockData, cleanupMockData } = require("../../utils/weather_mocker");
const helpers = require("./global-setup");

exports.startApplication = async (configFileName, additionalMockData) => {
	await helpers.startApplication(injectMockData(configFileName, additionalMockData));
	await helpers.getDocument();
};

exports.stopApplication = async () => {
	await helpers.stopApplication();
	cleanupMockData();
};
