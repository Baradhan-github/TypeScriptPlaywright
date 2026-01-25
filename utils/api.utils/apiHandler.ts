import fs from 'fs';
import path from 'path';
import { Logger } from '../logger.util/logger';
import { allureReportGenerate, includePassLogs } from '../../config/killSwitch.config';

async function attachJsonToAllure(testInfo: any, data: any, name: string, allureReportGenerate: boolean = true) {
    if (!allureReportGenerate) {
        return;
    }

    await testInfo.attach(name, {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json',
    });
}

export async function finalizeApiAttachment(testInfo: any, apiCapture: any, testNamePrefix: string = '') {
    const logger = new Logger(testInfo);

    const killSwitch = allureReportGenerate;
    const passLogs = includePassLogs;

    if (!apiCapture) {
        return;
    }

    await apiCapture.stopCapture();

    const testStatus = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';
    const logName = `${testNamePrefix}API_Capture_Logs_${testStatus}`;

    if (testStatus === 'FAILED' && testInfo.error) {
        await testInfo.attach('Test Failure Details', {
            body: JSON.stringify({
                testName: testInfo.title,
                errorMessage: testInfo.error.message || 'No error message',
                stack: testInfo.error.stack || 'No stack trace',
                status: testInfo.status,
                duration: testInfo.duration,
            }, null, 2),
            contentType: 'application/json',
        });
    }

    if (testStatus === 'PASSED' && !passLogs) {
        logger.info('Test passed and includePassLogs is false; skipping complete API log attachment...');
        apiCapture.clearCache();
        return;
    }

    const logPath = await apiCapture.saveLogsOnTestFailure(logName, {
        message: testStatus === 'PASSED' ? 'Test passed successfully.' : (testInfo.error ? testInfo.error.message : 'Test failed without error message.'),
        stack: testInfo.error ? testInfo.error.stack : 'No stack trace',
    })

    if (logPath) {
        logger.info('Reading API logs from file for attachment...');

        try {
            const logBuffer = fs.readFileSync(logPath, 'utf-8');
            let prettyBody;
            try {
                const json = JSON.parse(logBuffer.toString());
                prettyBody = JSON.stringify(json, null, 2);
            }
            catch (parseError) {
                prettyBody = logBuffer.toString();
                throw parseError;
            }

            if (testStatus === "PASSED") {
                await attachJsonToAllure(testInfo, prettyBody, "API Logs (PASSED)", killSwitch);
            }
            else {
                await attachJsonToAllure(testInfo, prettyBody, "API Logs (FAILED)", killSwitch);
            }
        }
        catch (error: any) {
            logger.warn(`Failed to read or attach API logs: ${error.message}`);
            throw error;
        }
    }


    const summary = apiCapture.getCacheSummary();

    logger.printSummary(testStatus, summary);

    const failedRequests = apiCapture.getFailedResponses();
    if (failedRequests.length > 0) {

        const failedApiCalls = failedRequests.filter((req: any) => req.status >= 400);

        if (failedApiCalls.length > 0) {
            await testInfo.attach('Failed API Calls Details', {
                body: JSON.stringify(failedApiCalls, null, 2),
                contentType: 'application/json',
            });
        }

        if (logger.printApiFailureSummary) {
            logger.printApiFailureSummary(failedRequests);
        }

        logger.printFailedRequestHeader(failedRequests.length);

        failedRequests.forEach((req: any, index: number) => {
            logger.printFailedRequestDetail(index + 1, req);
        });
    }
    else {
        logger.printSuccessMessage('All API requests were successful!');
    }

    await logger.attachAllureLogs();
    apiCapture.clearCache();

}