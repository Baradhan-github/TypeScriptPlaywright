import { Locator, Page, expect } from "playwright/test";

export class Validations {


    constructor(page: Page) { }


    /**
     * Check whether the element is visible or not
     * @param {Locator} locator - provide the locator to be check whether its visible or not. 
     * @param {boolean} condition  - provide the conditions for visiblity.
     * @remark
     * condition for visiblity:
     * * true - the element should be visible.
     * * false - the element should not be visible.
     * @public
     */
    async assertElementIsVisible(locator: Locator, condition: boolean = true) {
        if (condition === true) {
            await expect(locator).toBeVisible();
        }
        else {
            await expect(locator).toBeHidden();
        }

    }


    /**
     * Check whether the element is true or not
     * @param {Locator} locator - provide the locator to check whether its true or not. 
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking truthy:
     * * true - the condition must be true.
     * * false - the condition must not be false.
     * @public
     */
    async assertConditionAs(locator: Locator, condition: boolean = true) {
        if (condition === true) {
            await expect(await locator.textContent()).toBeTruthy();
        }
        else {
            await expect(await locator.textContent()).toBeFalsy();
        }
    }


    /**
     * Check whether the element is enabled or not
     * @param {Locator} locator - provide the locator to check whether its the element is enabled or not. 
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking the element is enabled or not:
     * * true - the condition for selecting element should be enabled.
     * * false - the condition for selecting element should not be enabled.
     * @public
     */
    async assertEnabled(locator: Locator, condition: boolean = true) {
        if (condition === true) {
            await expect(locator).toBeEnabled();
        }
        else {
            await expect(locator).toBeDisabled();
        }
    }


    /**
     * Check whether the radio is checked or not
     * @param {Locator} locator - provide the locator to check whether its checked or not.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking radio checked:
     * * true - the condition for selecting radio should be checked.
     * * false - the condition for selecting radio should not be checked.
     * @public
     */
    async assertRadioChecked(locator: Locator, condition: boolean = true) {
        if (condition === true) {
            await expect(locator).toBeChecked();
        }
        else {
            await expect(locator).not.toBeChecked();
        }
    }


    /**
     * Check whether the actual data matches the expected data.
     * @param {Locator} locator - provide the locator that is to be checked.
     * @param {string | number} expectedData - provide the expected data that needs to be checked.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking data:
     * * true - the condition for selecting expected data should be of actual result.
     * * false - the condition for selecting expected data should not be of actual result.
     * @public
     */
    async assertToBe(locator: Locator, expectedData: string | number, condition: boolean = true) {
        if (condition) {
            await expect(locator).toBe(expectedData);
        }
        else {
            await expect(locator).not.toBe(expectedData);
        }
    }


    /**
     * Check whether the actual text matches the expected text.
     * @param {Locator} locator - provide the locator of the text to be checked.
     * @param {string} expectedText - provide the expected text.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking actual result contains text:
     * * true - the condition for selecting actual result should contain contains text.
     * * false - the condition for selecting actual result should not conatain text.
     * @public
     */
    async assertToContainText(locator: Locator, expectedText: string, condition: boolean = true) {
        if (condition) {
            await expect(locator).toContainText(expectedText);
        }
        else {
            await expect(locator).not.toContainText(expectedText);
        }
    }


    /**
     * Check whether the actual text matches the expected text.
     * @param {Locator} locator - provide the locator of the text to be checked.
     * @param {string} expectedText - provide the expected value.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking actual result having text:
     * * true - the condition for selecting actual result should contain contains text.
     * * false - the condition for selecting actual result should not conatain text.
     * @public
     */
    async assertToHaveText(locator: Locator, expectedText: string, condition: boolean = true) {
        if (condition) {
            await expect(locator).toHaveText(expectedText);
        }
        else {
            await expect(locator).not.toHaveText(expectedText);
        }
    }


    /**
     * Check whether the attribute have the value.
     * @param {Locator} locator - provide the locator of the attribute.
     * @param {string} attribute - pass in the attribute.
     * @param {string} expectedAttributeValue - provide the attribute value.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking attribute value:
     * * true - the condition for selecting attribute matches the expected value.
     * * false - the condition for selecting attribute does not match the expected value.
     * @public
     */
    async assertToHaveAttribute(locator: Locator, attribute: string, expectedAttributeValue: string, condition: boolean = true) {
        if (condition) {
            await expect(locator).toHaveAttribute(attribute, expectedAttributeValue);
        }
        else {
            await expect(locator).not.toHaveAttribute(attribute, expectedAttributeValue);
        }
    }


    /**
     * Check whether the actual value matches the expected value.
     * @param {Locator} locator - provide the locator of the value to be checked.
     * @param {string} expectedValue - provide the expected value.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking value:
     * * true - the condition for selecting actual value should contain contains expected value.
     * * false - the condition for selecting actual value should not conatain expected value.
     * @public
     */
    async assertToHaveValue(locator: Locator, expectedValue: string, condition: boolean = true) {
        if (condition) {
            await expect(locator).toHaveValue(expectedValue);
        }
        else {
            await expect(locator).not.toHaveValue(expectedValue);
        }
    }


    /**
     * Check whether the actual class matches the expected class.
     * @param {Locator} locator - provide the locator of the class value to be checked.
     * @param {string} expectedClassName - provide the expected class value.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking class value:
     * * true - the condition for selecting actual class value should contain expected class value.
     * * false - the condition for selecting actual class value should not contain expected class value.
     * @public
     */
    async assertToHaveClass(locator: Locator, expectedClassName: string, condition: boolean = true) {
        if (condition) {
            await expect(locator).toHaveClass(expectedClassName);
        }
        else {
            await expect(locator).not.toHaveClass(expectedClassName);
        }
    }


    /**
     * Check whether the element count matches.
     * @param {Locator} locator - provide the locator of the element count.
     * @param {boolean} condition  - provide the conditions for true or false.
     * @remark
     * condition for checking element count:
     * * true - the condition for count should match.
     * * false - the condition for count should not match.
     * @public
     */
    async assertToHaveCount(locator: Locator, count: number, condition: boolean = true) {
        if (condition) {
            await expect(locator).toHaveCount(count);
        }
        else {
            await expect(locator).not.toHaveCount(count);
        }
    }

}