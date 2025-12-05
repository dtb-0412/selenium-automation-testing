import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

import {
    SERVER_URL, BASE_URL,
    LOGIN_EMAIL, LOGIN_PASSWORD,
    INVALID_EMAIL, INVALID_PASSWORD,
    ELEMENT_TIMEOUT, PAGE_LOAD_TIMEOUT,
    CAPABILITIES
} from '../config.js';

for (const capability of CAPABILITIES) {
    describe(`Login functionality - ${capability.browserName}`, function () {
        let driver;

        before(async function () {
            console.log('Using BrowserStack server:', SERVER_URL);
            console.log('Starting session');
            driver = await new Builder()
                .usingServer(SERVER_URL)
                .withCapabilities({...capability})
                .build();
            ;
            const browserName = capability.browserName;
            const browserVersion = capability.browserVersion;
            const bstack = capability['bstack:options']
            const os = bstack.os;
            const osVersion = bstack.osVersion;
            const sessionName = `${browserName} ${browserVersion} - ${os} ${osVersion}`;
            try {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": sessionName}}));
            } catch (err) {
                console.log('Unable to set session name: ', err.message);
            }
            console.log(`Browser session started on: ${sessionName}`);
        });

        beforeEach(async function () {
            await driver.get(BASE_URL + '/auth/login');

        });

        after(async function () {
            await driver.quit();
        });

        it("TC-LOGIN-01: Log in successfully by clicking \"Login\"", async function () {
            try {
                await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
                
                await driver.findElement(By.id('email')).sendKeys(LOGIN_EMAIL);
                await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD);
                await driver.findElement(By.className('btnSubmit')).click();
                await driver.wait(until.urlContains('/account'), PAGE_LOAD_TIMEOUT);

                await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status": "passed", "reason": "User logged in successfully"}}');
            } catch (e) {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionStatus", "arguments": {"status": "failed", "reason": e.message}}));
                throw e;
            }
        });

        it("TC-LOGIN-02: Log in successfully by pressing  \"Enter\"", async function () {
            try {
                await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
                
                await driver.findElement(By.id('email')).sendKeys(LOGIN_EMAIL);
                await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD, Key.ENTER);
                await driver.wait(until.urlContains('/account'), PAGE_LOAD_TIMEOUT);

                await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status": "passed", "reason": "User logged in successfully"}}');
            } catch (e) {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionStatus", "arguments": {"status": "failed", "reason": e.message}}));
                throw e;
            }
        });

        it("TC-LOGIN-03: Password is hidden by default", async function () {
            try {
                await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
                
                await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD);
                await driver.wait(until.elementLocated(By.id('password')), ELEMENT_TIMEOUT);
                const attribute = await driver.findElement(By.id('password')).getAttribute('type');
                expect(attribute).to.equal('password');

                await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status": "passed", "reason": "Password is hidden correctly"}}');
            } catch (e) {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionStatus", "arguments": {"status": "failed", "reason": e.message}}));
                throw e;
            }
        });

        it("TC-LOGIN-04: Password is displayed correctly", async function () {
            try {
                await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
                
                await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD);
                await driver.findElement(By.className('btn btn-outline-secondary')).click();
                await driver.wait(until.elementLocated(By.id('password')), ELEMENT_TIMEOUT);
                const attribute = await driver.findElement(By.id('password')).getAttribute('type');
                expect(attribute).to.equal('text');

                await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status": "passed", "reason": "Password is displayed correctly"}}');
            } catch (e) {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionStatus", "arguments": {"status": "failed", "reason": e.message}}));
                throw e;
            }
        });

        it("TC-LOGIN-05: Information fields is required", async function () {
            try {
                await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
                
                await driver.findElement(By.className('btnSubmit')).click();
                
                await driver.wait(until.elementLocated(By.id('email-error')), ELEMENT_TIMEOUT);
                await driver.wait(until.elementLocated(By.id('password-error')), ELEMENT_TIMEOUT);
                const emailMsg = await driver.findElement(By.id('email-error')).getText();
                const passwordMsg = await driver.findElement(By.id('password-error')).getText();
                expect(emailMsg).to.equal('Email is required');
                expect(passwordMsg).to.equal('Password is required');

                await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status": "passed", "reason": "Error message is displayed correctly"}}');
            } catch (e) {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionStatus", "arguments": {"status": "failed", "reason": e.message}}));
                throw e;
            }
        });

        it("TC-LOGIN-06: Invalid Email format", async function () {
            try {
                await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
                await driver.findElement(By.id('email')).sendKeys(INVALID_EMAIL);
                await driver.findElement(By.className('btnSubmit')).click();
                await driver.wait(until.elementLocated(By.id('email-error')), ELEMENT_TIMEOUT);
                const msg = await driver.findElement(By.id('email-error')).getText();
                expect(msg).to.equal('Email format is invalid');

                await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed", "reason": "Error message is displayed correctly"}}');
            } catch (e) {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionStatus", "arguments": {"status": "failed", "reason": e.message}}));
                throw e;
            }
        });

        it("TC-LOGIN-07: Invalid user information", async function () {
            try {
                await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
                await driver.findElement(By.id('email')).sendKeys(LOGIN_EMAIL);
                await driver.findElement(By.id('password')).sendKeys(INVALID_PASSWORD);
                await driver.findElement(By.className('btnSubmit')).click();
                await driver.wait(until.elementLocated(By.css('[data-test="login-error"]')), ELEMENT_TIMEOUT);
                const msg = await driver.findElement(By.css('[data-test="login-error"]')).getText();
                expect(msg).to.equal('Invalid email or password');

                await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status": "passed", "reason": "Error message is displayed correctly"}}');
            } catch (e) {
                await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionStatus", "arguments": {"status": "failed", "reason": e.message}}));
                throw e;
            }
        });
    });
}