import pino from 'pino';
import { attach_Logs } from '../../config/killSwitch.config.ts'
import { info } from 'console';

// for colours in colsole
const colours = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    grey: '\x1b[90m',
};

const stripColours = (str: string) => {
    return str.replace(/\x1b\[[0-9;]*m/g, '');
};

export class Logger {

    logs: Array<any>;
    logInfo: any;
    attachMode: string;
    logger: pino.Logger;


    constructor(logInfo = null) {
        this.logs = [];
        this.logInfo = logInfo;

        this.attachMode = (attach_Logs || 'immediate').toLowerCase();

        this.logger = pino({
            transport: {
                target: 'pino-pretty',
                options: { colourize: true, ignore: 'pid,hostname,time' }
            }
        });
    }

    shouldAttach(level: string) {
        switch (this.attachMode) {
            case 'immediate':
                return true;
            case 'error-only':
                return level === 'error' || level === 'warn';
            case 'buffer':
            default:
                return true;
        }
    }

    info(message: string) {
        this.logger.info(message);
        const cleanMessage = stripColours(message);
        this.logs.push(('INFO: ' + cleanMessage));
        if (this.logInfo && this.shouldAttach('INFO')) {
            this.logInfo.attach('Log', { body: cleanMessage, contentType: 'text/plain' }).catch((error: Error) => {
                console.error('Failed to attach log to allure:', error.message);
            });
        }
    }


    warn(message: string) {
        this.logger.info(message);
        const cleanMessage = stripColours(message);
        this.logs.push(('WARN: ' + cleanMessage));
        if (this.logInfo && this.shouldAttach('WARN')) {
            this.logInfo.attach('Log', { body: cleanMessage, contentType: 'text/plain' }).catch((error: Error) => {
                console.error('Failed to attach log info:', error);
            });
        }
    }

    error(message: string) {
        this.logger.info(message);
        const cleanMessage = stripColours(message);
        this.logs.push(('ERROR: ' + cleanMessage));
        if (this.logInfo && this.shouldAttach('ERROR')) {
            this.logInfo.attach('Log', { body: cleanMessage, contentType: 'text/plain' }).catch((error: Error) => {
                console.error('Failed to attach log info:', error);
            });
        }
    }


    debug(message: string) {
        this.logger.info(message);
        const cleanMessage = stripColours(message);
        this.logs.push(('DEBUG: ' + cleanMessage));
        if (this.logInfo && this.shouldAttach('DEBUG')) {
            this.logInfo.attach('Log', { body: cleanMessage, contentType: 'text/plain' }).catch((error: Error) => {
                console.error('Failed to attach log info:', error);
            });
        }
    }


    async attachAllureLogs(name: string = 'Pino Logs') {
        if (this.logInfo && this.logs.length) {
            await this.logInfo.attach(name, { body: this.logs.join('\n'), contentType: 'text/plain' });
        }
    }


    async attach(name: string, content: string, contentType: string = 'text/plain') {
        if (this.logInfo) {
            try {
                await this.logInfo.attach(name, { body: content, contentType: contentType });
            } catch (error) {
                console.warn(`Failed to attach log info ${name} to allure:`, error);
            }
        }
    }



    printSummary(status: string, summary: string) {
        const color = status === 'PASSED' ? colours.green : colours.red;
        const msg = `API CAPTURE SUMMARY (${colours.bright}${color}${status}${colours.reset}): ${JSON.stringify(summary)}`;
        this.info(msg);
    }

    printFailedRequestHeader(count: number) {
        this.info(`\n${colours.red}Found ${count} failed API requests:${colours.reset}\n`);
    }

    printFailedRequestDetail(index: number, req: { method: string; url: string; status: number; statusText: string; timestamp: string; body?: string; }) {
        let msg = `${colours.yellow}${index}. ${req.method} ${req.url}${colours.reset}\n`;
        msg += `${colours.grey}Status:${colours.reset} ${req.status} ${req.statusText}\n`;
        msg += `${colours.grey}Timestamp:${colours.reset} ${req.timestamp}\n`;

        const bodyPreview = req.body ? req.body.substring(0, 200) : 'N/A';
        const suffix = req.body && req.body.length > 200 ? '...' : '';
        msg += `${colours.grey}Response:${colours.reset} ${bodyPreview} ${suffix}\n`;
        this.info(msg);
    }

    printSuccessMessage(msg: string) {
        this.info(`\n${colours.green}${msg}${colours.reset}`);
    }

    printApiFailureSummary(requests: Array<{ method: string; url: string; status: number; timestamp: string; }>) {
        this.info(`\n${colours.bright}-----API FAILURE SUMMARY-----${colours.reset}`);

        requests.forEach((req, index) => {
            const color = req.status >= 500 ? colours.red : (req.status >= 400 ? colours.yellow : colours.green);

            this.info(`${index + 1}. ${color}[${req.method}] ${req.status}${colours.reset} - ${req.url} (${req.timestamp})`);
        });
        this.info(`\n${colours.bright}-----API FAILURE SUMMARY-----${colours.reset}`);

    }

}