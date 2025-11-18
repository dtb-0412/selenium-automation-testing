import { Browser, Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import edge from 'selenium-webdriver/edge.js';

import {
    LOGIN_EMAIL, LOGIN_PASSWORD,
    INVALID_EMAIL, INVALID_PASSWORD,
    ELEMENT_TIMEOUT, PAGE_LOAD_TIMEOUT,
    BASE_URL
} from '../config.js';
import { delay } from '../utils.js';

describe("Chức năng đăng nhập", async function () {
    let driver;
    
    // Build web driver for browser before all tests
    before(async function () {
        driver = await new Builder()
            .forBrowser(Browser.EDGE)
            .setEdgeOptions(new edge.Options().addArguments('--disable-logging'))
            .build();
    });

    // Navigate to login page before each test
    beforeEach(async function () {
        await driver.get(BASE_URL + '/auth/login');
    });

    // Quit web driver after all tests
    after(async function () {
        await driver.quit();
    });

    it("TC-LOGIN-01: Đăng nhập thành công bằng nút \"Login\"", async function () {
        await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
        
        await delay();
        await driver.findElement(By.id('email')).sendKeys(LOGIN_EMAIL);
        await delay();
        await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD);
        await delay();
        await driver.findElement(By.className('btnSubmit')).click();
        await delay();
        await driver.wait(until.urlContains('/account'), PAGE_LOAD_TIMEOUT);
    });

    it("TC-LOGIN-02: Đăng nhập thành công bằng phím \"Enter\"", async function () {
        await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
        
        await delay();
        await driver.findElement(By.id('email')).sendKeys(LOGIN_EMAIL);
        await delay();
        
        await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD, Key.ENTER);
        await delay();
        await driver.wait(until.urlContains('/account'), PAGE_LOAD_TIMEOUT);
    });

    it("TC-LOGIN-03: Mật khẩu được ẩn đi mặc định", async function () {
        await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
        
        await delay();
        await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD);
        await delay();
        
        await driver.wait(until.elementLocated(By.id('password')), ELEMENT_TIMEOUT);
        const attribute = await driver.findElement(By.id('password')).getAttribute('type');
        expect(attribute).to.equal('password');
    });

    it("TC-LOGIN-04: Mật khẩu được hiển thị chính xác", async function () {
        await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
        
        await delay();
        await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD);
        await delay();
        await driver.findElement(By.className('btn btn-outline-secondary')).click();
        await delay();
        
        await driver.wait(until.elementLocated(By.id('password')), ELEMENT_TIMEOUT);
        const attribute = await driver.findElement(By.id('password')).getAttribute('type');
        expect(attribute).to.equal('text');
    });

    it("TC-LOGIN-05: Để trống thông tin", async function () {
        await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
        
        await delay();
        await driver.findElement(By.className('btnSubmit')).click();
        await delay();
        
        await driver.wait(until.elementLocated(By.id('email-error')), ELEMENT_TIMEOUT);
        await driver.wait(until.elementLocated(By.id('password-error')), ELEMENT_TIMEOUT);
        const emailMsg = await driver.findElement(By.id('email-error')).getText();
        const passwordMsg = await driver.findElement(By.id('password-error')).getText();
        expect(emailMsg).to.equal('Email is required');
        expect(passwordMsg).to.equal('Password is required');
    });

    it("TC-LOGIN-06: Email không đúng định dạng", async function () {
        await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
        
        await delay();
        await driver.findElement(By.id('email')).sendKeys(INVALID_EMAIL);
        await delay();
        await driver.findElement(By.className('btnSubmit')).click();
        await delay();
        
        await driver.wait(until.elementLocated(By.id('email-error')), ELEMENT_TIMEOUT);
        const msg = await driver.findElement(By.id('email-error')).getText();
        expect(msg).to.equal('Email format is invalid');
    });

    it("TC-LOGIN-07: Sai thông tin đăng nhập", async function () {
        await driver.wait(until.elementLocated(By.css('[data-test="login-form"]')), ELEMENT_TIMEOUT);
        
        await delay();
        await driver.findElement(By.id('email')).sendKeys('group16@gmail.com');
        await delay();
        await driver.findElement(By.id('password')).sendKeys(INVALID_PASSWORD);
        await delay();
        await driver.findElement(By.className('btnSubmit')).click();
        await delay();
        
        await driver.wait(until.elementLocated(By.css('[data-test="login-error"]')), ELEMENT_TIMEOUT);
        const msg = await driver.findElement(By.css('[data-test="login-error"]')).getText();
        expect(msg).to.equal('Invalid email or password');
    });
});