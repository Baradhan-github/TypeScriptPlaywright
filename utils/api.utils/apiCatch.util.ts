import { Page } from '@playwright/test'
import fs from 'fs';
import path from 'path';
import { Logger } from '../logger.util/logger';

export class ApiCatchUtils {

    apiCache: any[];
    isCapturing: boolean;
    page: Page;
    logger: Logger;

    constructor(page: Page, logInfo: any = null) {
        this.page = page;
        this.apiCache = [];
        this.isCapturing = false;
        this.logger = new Logger(logInfo);
    }

    startCapture() {
        if (this.isCapturing) {
            return;
        }
        this.isCapturing = true;
        this.apiCache = [];

        this.page.on("request", this.requestHandler);
        this.page.on("response", this.responseHandler);
        this.logger.info('API capture started.');
    }

    requestHandler = (request: any) => {
        if (this.shouldCaptureRequest(request)) {
            this.apiCache.push({
                type: 'request',
                timestamp: new Date().toISOString(),
                url: request.url(),
                method: request.method(),
                requestHeaders: request.headers(),
                requestBody: request.postData(),
                responseHeaders: null,
                responseBody: null,
                status: null,
                resourceType: request.resourceType()
            });
        }
    };

    shouldCaptureRequest(request: any) {
        const url = request.url();
        const resourceType = request.resourceType();

        return resourceType === 'xhr' || resourceType === 'fetch' ||
            url.includes('/api/') || url.includes('/graphql/') ||
            url.includes('/rest/');
    }

    shouldCaptureResponse(response: any) {
        const request = response.request();
        return this.shouldCaptureRequest(request);
    }

    responseHandler = async (response: any) => {
        if (this.shouldCaptureResponse(response)) {
            let responseBody;
            try {
                const contentType = response.headers()['content-type'] || '';
                if (contentType.includes('json') || contentType.includes('text/') || contentType.includes('xml')) {
                    responseBody = await response.text();
                }
                else {
                    responseBody = `<${contentType} content not captured>`;
                }
            }
            catch (error: any) {
                responseBody = `<unable to capture response body>`;
                this.logger.error(`Failed to capture response body for ${response.url()}: ${error.message}`);
            }

            this.apiCache.push({
                type: 'response',
                timestamp: new Date().toISOString(),
                url:response.url(),
                method: response.reqest().method(),
                status: response.status(),
                statusText: response.statusText(),
                responseHeaders: response.headers(),
                requestHeaders: response.request().headers(),
                requestBody: response.request().postData(),
                responseBody: responseBody,
                resourceType: response.request().resourceType()
            });
        }
    }

    stopCapture() {
        if (!this.isCapturing) {
            return;
        }

        this.page.off("request", this.requestHandler);
        this.page.off("response", this.responseHandler);
        this.isCapturing = false;

        this.logger.info('API capture stopped.');
    }

    saveCaptureToFile(filePath: string) {
        if (this.apiCache.length === 0) {
            return null;
        }

        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(this.apiCache, null, 2), 'utf-8');
    }

    async saveLogsOnTestFailure(testInfo: any, filePath: string, errorDetails: any = {}) {
        // if (testInfo.status === 'failed') {
        //     this.stopCapture();
        //     this.saveCaptureToFile(filePath);
        //     await testInfo.attach('api-logs', { path: filePath, contentType: 'application/json' });
        // }


        if (this.apiCache.length === 0) {
            this.logger.info('No API logs to save.');
            return null;
        }

        const logsDir = path.join(process.cwd(), 'test-results','api-logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const clearTestName = testInfo.replace(/[^a-zA-Z0-9-_]/gi, '-').toLowerCase();
        const logFilepath = path.join(logsDir, `${clearTestName}-${timestamp}.json`);

        const logData = {
            testInfo: testInfo,
            timestamp: timestamp,
            error:{
                message: errorDetails.message || 'N/A',
                stack: errorDetails?.stack || ''
            },
            summary: {
                totalRequests: this.apiCache.filter(log => log.type === 'request').length,
                totalResponses: this.apiCache.filter(log => log.type === 'response').length,
                failedResponses: this.apiCache.filter(log => log.type === 'response' && log.status >= 400).length
            },
            logs: this.apiCache
        };
        fs.writeFileSync(logFilepath, JSON.stringify(logData, null, 2), 'utf-8');
        this.logger.info(`API logs saved to ${logFilepath}`);

        return logFilepath;
    }

    getLogsByRequests(){
        return this.apiCache.filter(log => log.type === 'request');
    }

    getLogsByResponses(){
        return this.apiCache.filter(log => log.type === 'response');
    }

    getLogsByUrl(urlSubstring: string){
        return this.apiCache.filter(log => log.url.includes(urlSubstring));
    }

    getFailedResponses(){
        return this.apiCache.filter(log => log.type === 'response' && log.status >= 400);
    }

    getAllLogs(){
        return this.apiCache;
    }

    clearCache(){
        this.apiCache = [];
        this.logger.info('API cache cleared.');
    }

    getCacheSize(){
        return this.apiCache.length;
    }

    getCacheSummary(){
        return {
            totalRequests: this.getLogsByRequests().length,
            totalResponses: this.getLogsByResponses().length,
            failedResponses: this.getFailedResponses().length,
            cacheSize: this.getCacheSize()
        };
    }



}