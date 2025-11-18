import dotenv from 'dotenv';
dotenv.config();

const SERVER_URL = `https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`;

const BASE_URL = process.env.BASE_URL;

const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const INVALID_EMAIL = process.env.INVALID_EMAIL;
const INVALID_PASSWORD = process.env.INVALID_PASSWORD;
const ELEMENT_TIMEOUT = parseInt(process.env.ELEMENT_TIMEOUT);
const PAGE_LOAD_TIMEOUT = parseInt(process.env.PAGE_LOAD_TIMEOUT);

const COMMON_CAPABILITIES = {
    "bstack:options": {
        'projectName': 'Group 15 - Cross Browser Testing',
        'buildName': 'Login Functionality',
    }
};

const CAPABILITIES = [
    {
        'browserName': 'chrome',
        'browserVersion': 'latest',
        'bstack:options': {
            'os': 'Windows',
            'osVersion': '11',
            ...COMMON_CAPABILITIES['bstack:options']
        },
        'name': ''
    },
    {
        'browserName': 'edge',
        'browserVersion': 'latest',
        'bstack:options': {
            'os': 'Windows',
            'osVersion': '8',
            ...COMMON_CAPABILITIES['bstack:options']
        },
        'name': ''
    },
    {
        'browserName': 'firefox',
        'browserVersion': 'latest',
        'bstack:options': {
            'os': 'Windows',
            'osVersion': '10',
            ...COMMON_CAPABILITIES['bstack:options']
        },
        'name': ''
    },
];

export {
    SERVER_URL,
    BASE_URL,
    LOGIN_EMAIL,
    LOGIN_PASSWORD,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    ELEMENT_TIMEOUT,
    PAGE_LOAD_TIMEOUT,
    CAPABILITIES
}