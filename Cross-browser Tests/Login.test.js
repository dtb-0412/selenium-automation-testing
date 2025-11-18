import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

import {
    SERVER_URL, BASE_URL,
    LOGIN_EMAIL, LOGIN_PASSWORD,
    INVALID_EMAIL, INVALID_PASSWORD,
    ELEMENT_TIMEOUT, PAGE_LOAD_TIMEOUT,
    CAPABILITIES
} from '../config.js';

let driver;

CAPABILITIES.forEach(async function (capability) {
    describe("Login functionality", async function () {
        // Build web driver for each browser before all tests
        before(async function () {
            driver = new Builder()
                .usingServer(SERVER_URL)
                .withCapabilities({...capability})
                .build();
            console.log(`Browser session started on ${capability.browserName}`);
        });

        // Navigate to login page before each test
        beforeEach(async function () {
            await driver.get(BASE_URL + '/auth/login');

        });

        // Quit web driver after all tests
        after(async function () {
            await driver.quit();
        });

        it("TC-LOGIN-01: Log in successfully by clicking \"Login\"", async function () {
            await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": this.test.title}}));
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
            await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": this.test.title}}));
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
            await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": this.test.title}}));
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
            await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": this.test.title}}));
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
            await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": this.test.title}}));
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
            await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": this.test.title}}));
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
            await driver.executeScript('browserstack_executor: ' + JSON.stringify({"action": "setSessionName", "arguments": {"name": this.test.title}}));
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
});