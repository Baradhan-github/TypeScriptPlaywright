import { Locator, Page } from 'playwright/test';
import test, { afterEach, before } from 'node:test';
import {finalizeApiAttachment} from './utils/api.utils/apiHandler';
import { Logger } from './utils/logger.util/logger';
import {ApiCatchUtils} from './utils/api.utils/apiCatch.util';
import { appUrl } from './config/environment';

export function setUpTestHooks(finalizeInput: any) {
    let apiCapture: any, logger: any, page: Page;

    return{
        beforeEach: async ({ page }: { page: Page }, testInfo: any)  => {

            logger = new Logger();
            logger.info('Base Url:' + appUrl);
            apiCapture = new ApiCatchUtils(page, testInfo);
            apiCapture.startCapture();
            logger.info(`Starting test: ${testInfo.title}`);
            logger.info('Navigating to URL: ' + appUrl);
            await page.goto(appUrl);
        },

        afterEach: async ({}, testInfo: any)  => {
            logger.info('Finished tests ended');
            await finalizeApiAttachment(testInfo, apiCapture, finalizeInput);
            await logger.attachAllureLogs();
        }
    }
}