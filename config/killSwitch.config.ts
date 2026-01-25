// Logger attach configuration
// Options: 'immediate', 'buffer', 'error-only'
// immediate - attach logs immediately after they are created
// buffer - buffer logs and attach them at the end of the test
// errors-only - attach logs only for errors and warns
export const attach_Logs = 'immediate';

// API Capture configuration
// Options: true, false
// true - enable report generation
// false - disable report generation
export const generate_Report = true;

// Allure Report Generation configuration
// Options: true, false
// true - enable allure report generation
// false - disable allure report generation
export const allureReportGenerate = true;


// Include logs for passed tests in Allure Report
// Options: true, false
// true - include logs for passed tests
// false - exclude logs for passed tests
export const includePassLogs =  false;