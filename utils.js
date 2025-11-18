import { By, until } from "selenium-webdriver";
import { expect } from "chai";

import { ELEMENT_TIMEOUT } from "./config.js";

export function delay(time = 1000) {
    // Delay action for a specified time in milliseconds
    // Used to slow down the test execution for observation purposes
    return new Promise(resolve => setTimeout(resolve, time));
}

export async function assertErrorMessage(driver, expected) {
    // Assert according to expected data field
    for (const e of expected) {
        let element;
        switch (e.by) {
            case 'id': {
                await driver.wait(until.elementLocated(By.id(e.name)), ELEMENT_TIMEOUT);
                element = await driver.findElement(By.id(e.name));
                break;
            }
            case 'className': {
                await driver.wait(until.elementLocated(By.className(e.name)), ELEMENT_TIMEOUT);
                element = await driver.findElement(By.className(e.name));
                break;
            }
            case 'data-test': {
                await driver.wait(until.elementLocated(By.css(`[data-test=\"${e.name}\"]`)), ELEMENT_TIMEOUT);
                element = await driver.findElement(By.css(`[data-test=\"${e.name}\"]`));
                break;
            }
            default:
                throw new Error(`Unknown selector type: ${e.by}`);
        }

        const msg = await element.getText();
        expect(msg).to.contain(e.value);
    }
}