const BROWSER_STACK_USERNAME = 'dtb_aGOwcV'// 'thinbodng_PmFzjh';
const BROWSER_STACK_ACCESS_KEY = '9JqmjKrxGiyVz221Xb7z'// 'XqaUkxYbAnsVCgftzdJk';
const SERVER_URL = `https://${BROWSER_STACK_USERNAME}:${BROWSER_STACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`;
const BASE_URL = 'https://practicesoftwaretesting.com';

const LOGIN_EMAIL = 'group15@gmail.com';
const LOGIN_PASSWORD = 'Group15@';
const INVALID_EMAIL = 'group15@.com';
const INVALID_PASSWORD = '12345';
const ELEMENT_TIMEOUT = 10000;
const PAGE_LOAD_TIMEOUT = 20000;


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