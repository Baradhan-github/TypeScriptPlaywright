import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const appUrl: string = process.env.BASE_URL || (() => {
    throw new Error('appURL not defined in .env file');
})();;
export const encUsername: string = process.env.APP_USERNAME || (() => {
    throw new Error('APP_USERNAME not defined in .env file');
})();
export const encPassword: string = process.env.APP_PASSWORD || (() => {
    throw new Error('APP_PASSWORD not defined in .env file');
})();;
