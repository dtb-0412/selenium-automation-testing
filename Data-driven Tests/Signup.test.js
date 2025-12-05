import { Browser, Builder, By, until } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';
import fs from 'fs';

import {
    ELEMENT_TIMEOUT,
    BASE_URL
} from '../config.js';
import { delay, assertErrorMessage } from '../utils.js';

const data = JSON.parse(fs.readFileSync('./Tests Data/signup.data.json', 'utf-8'));

describe("Chức năng đăng ký", function () {
    let driver;

    before(async function () {
        driver = await new Builder()
            .forBrowser(Browser.EDGE)
            .setEdgeOptions(new edge.Options().addArguments(
                '--disable-logging',
                '--start-maximized'))
            .build();
    });

    after(async function () {
        await driver.quit();
    });

    // Iterate through each data sample to run test case
    data.forEach(async function (testCase) {
        it(`${testCase.id}: ${testCase.description}`, async function () {
            await driver.get(BASE_URL + '/auth/register');

            await driver.wait(until.elementLocated(By.css('[data-test="register-form"]')), ELEMENT_TIMEOUT);
            
            await delay();
            await driver.findElement(By.id('first_name')).sendKeys(testCase.data.first_name);
            await driver.findElement(By.id('last_name')).sendKeys(testCase.data.last_name);
            await driver.findElement(By.id('dob')).sendKeys(testCase.data.dob);
            await delay();
            await driver.findElement(By.id('street')).sendKeys(testCase.data.street);
            await driver.findElement(By.id('city')).sendKeys(testCase.data.city);
            await driver.findElement(By.id('state')).sendKeys(testCase.data.state);
            await driver.findElement(By.id('country')).sendKeys(testCase.data.country);
            await driver.findElement(By.id('postal_code')).sendKeys(testCase.data.postal_code);
            await delay();
            await driver.findElement(By.id('phone')).sendKeys(testCase.data.phone);
            await delay();
            await driver.findElement(By.id('email')).sendKeys(testCase.data.email);
            await delay();
            await driver.findElement(By.id('password')).sendKeys(testCase.data.password);
            await delay();
            await driver.findElement(By.className('btnSubmit')).click();
            await delay();

            await assertErrorMessage(driver, testCase.expected);
        });
    });
});