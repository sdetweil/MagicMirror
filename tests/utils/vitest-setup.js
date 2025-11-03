/**
 * Vitest setup file for module aliasing
 * This allows require("logger") to work in unit tests
 */

const Module = require("node:module");
const path = require("node:path");

// Store the original require
const originalRequire = Module.prototype.require;

// Override require to handle our custom aliases
Module.prototype.require = function (id) {
	// Handle "logger" alias
	if (id === "logger") {
		return originalRequire.call(this, path.resolve(__dirname, "../../js/logger.js"));
	}

	// Handle all other requires normally
	return originalRequire.apply(this, arguments);
};
