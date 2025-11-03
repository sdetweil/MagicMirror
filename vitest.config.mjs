import {defineConfig} from "vitest/config";

/*
 * Sequential execution keeps our shared test server stable:
 * - All suites bind to port 8080
 * - Fixtures and temp paths are reused between tests
 * - Debugging becomes predictable
 *
 * Parallel execution would require dynamic ports and isolated fixtures,
 * so we intentionally cap Vitest at a single worker for now.
 */

export default defineConfig({
	test: {
		// Global settings
		globals: true,
		environment: "node",
		// Setup files for require aliasing
		setupFiles: ["./tests/utils/vitest-setup.js"],
		// Increased from 20s to 60s for E2E tests, 120s for Electron tests
		testTimeout: 120000,
		// Increase hook timeout for Electron cleanup
		hookTimeout: 30000,
		// Stop test execution on first failure
		bail: 1,

		// File patterns
		include: [
			"tests/**/*_spec.js",
			// Legacy regression test without the _spec suffix
			"tests/unit/modules/default/calendar/calendar_fetcher_utils_bad_rrule.js"
		],
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"tests/unit/mocks/**",
			"tests/unit/helpers/**",
			"tests/electron/helpers/**",
			"tests/e2e/helpers/**",
			"tests/e2e/mocks/**",
			"tests/configs/**",
			"tests/utils/**"
		],

		// Coverage configuration
		coverage: {
			provider: "v8",
			reporter: ["lcov", "text"],
			include: [
				"clientonly/**/*.js",
				"js/**/*.js",
				"modules/default/**/*.js",
				"serveronly/**/*.js"
			],
			exclude: [
				"**/node_modules/**",
				"**/tests/**",
				"**/dist/**"
			]
		},

		/*
		 * Pool settings for isolated test execution. Keep maxWorkers at 1 so
		 * port 8080 and shared fixtures remain safe across the full suite.
		 */
		pool: "forks",
		maxWorkers: 1,
		isolate: true
	}
});
