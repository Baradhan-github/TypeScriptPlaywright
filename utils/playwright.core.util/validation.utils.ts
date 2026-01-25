import { Locator, Page, expect } from "playwright/test";
import { Logger } from "../logger.util/logger";
import { ActionUtils } from "./Playwright.utils";

/**
 * Utility class for common Playwright validations with logging.
 * Provides methods for visibility, enabled/disabled state, text, attributes, value, class, count, and radio checks.
 */
export class Validations {

    private page: Page;
    logger: any;
    actions: any;

    constructor(page: Page) {
        this.page = page;
        this.logger = new Logger();
        this.actions = new ActionUtils(page);
    }

    /* -------------------- Visibility -------------------- */

    /**
     * Assert that an element is visible on the page.
     * @param locator - The Playwright locator to check.
     */
    async assertElementIsVisible(locator: Locator) {
        this.logger.info(`Checking visibility of element: ${locator}`);
        await expect(locator).toBeVisible();
        this.logger.info(`Element is visible: ${locator}`);
    }

    /**
     * Assert that an element is hidden on the page.
     * @param locator - The Playwright locator to check.
     */
    async assertElementIsHidden(locator: Locator) {
        this.logger.info(`Checking invisibility of element: ${locator}`);
        await expect(locator).toBeHidden();
        this.logger.info(`Element is hidden: ${locator}`);
    }

    /* -------------------- Enabled / Disabled -------------------- */

    /**
     * Assert that an element is enabled.
     * @param locator - The Playwright locator to check.
     */
    async assertEnabled(locator: Locator) {
        this.logger.info(`Checking if element is enabled: ${locator}`);
        await expect(locator).toBeEnabled();
        this.logger.info(`Element is enabled: ${locator}`);
    }

    /**
     * Assert that an element is disabled.
     * @param locator - The Playwright locator to check.
     */
    async assertDisabled(locator: Locator) {
        this.logger.info(`Checking if element is disabled: ${locator}`);
        await expect(locator).toBeDisabled();
        this.logger.info(`Element is disabled: ${locator}`);
    }

    /* -------------------- Radio -------------------- */

    /**
     * Assert that a radio button is checked.
     * @param locator - The Playwright locator of the radio button.
     */
    async assertRadioChecked(locator: Locator) {
        this.logger.info(`Checking if radio is checked: ${locator}`);
        await expect(locator).toBeChecked();
        this.logger.info(`Radio is checked: ${locator}`);
    }

    /**
     * Assert that a radio button is NOT checked.
     * @param locator - The Playwright locator of the radio button.
     */
    async assertRadioNotChecked(locator: Locator) {
        this.logger.info(`Checking if radio is NOT checked: ${locator}`);
        await expect(locator).not.toBeChecked();
        this.logger.info(`Radio is NOT checked: ${locator}`);
    }

    /* -------------------- Text -------------------- */

    /**
     * Assert that the element's text exactly matches the expected text.
     * @param locator - The Playwright locator.
     * @param expectedText - The expected text value.
     */
    async assertToHaveText(locator: Locator, expectedText: string) {
        this.logger.info(`Checking element text equals: "${expectedText}" for ${locator}`);
        await expect(locator).toHaveText(expectedText);
        this.logger.info(`Element text matches expected: "${expectedText}" for ${locator}`);
    }

    /**
     * Assert that the element's text contains the expected text.
     * @param locator - The Playwright locator.
     * @param expectedText - The expected substring.
     */
    async assertToContainText(locator: Locator, expectedText: string) {
        this.logger.info(`Checking element text contains: "${expectedText}" for ${locator}`);
        await expect(locator).toContainText(expectedText);
        this.logger.info(`Element text contains expected: "${expectedText}" for ${locator}`);
    }

    /**
     * Assert that the element's text does NOT contain the specified text.
     * @param locator - The Playwright locator.
     * @param text - The text that should NOT be present.
     */
    async assertNotToContainText(locator: Locator, text: string) {
        this.logger.info(`Checking element text does NOT contain: "${text}" for ${locator}`);
        await expect(locator).not.toContainText(text);
        this.logger.info(`Element text does NOT contain: "${text}" for ${locator}`);
    }

    /* -------------------- Value -------------------- */

    /**
     * Assert that the element has the specified value.
     * @param locator - The Playwright locator.
     * @param expectedValue - The expected value.
     */
    async assertToHaveValue(locator: Locator, expectedValue: string) {
        this.logger.info(`Checking element value equals: "${expectedValue}" for ${locator}`);
        await expect(locator).toHaveValue(expectedValue);
        this.logger.info(`Element value matches expected: "${expectedValue}" for ${locator}`);
    }

    /**
     * Assert that the element does NOT have the specified value.
     * @param locator - The Playwright locator.
     * @param value - The value that should NOT be present.
     */
    async assertNotToHaveValue(locator: Locator, value: string) {
        this.logger.info(`Checking element value does NOT equal: "${value}" for ${locator}`);
        await expect(locator).not.toHaveValue(value);
        this.logger.info(`Element value does NOT match: "${value}" for ${locator}`);
    }

    /* -------------------- Attribute -------------------- */

    /**
     * Assert that the element has a specific attribute with the expected value.
     * @param locator - The Playwright locator.
     * @param attribute - The attribute name.
     * @param expectedAttributeValue - The expected attribute value.
     */
    async assertToHaveAttribute(locator: Locator, attribute: string, expectedAttributeValue: string) {
        this.logger.info(`Checking attribute "${attribute}" equals "${expectedAttributeValue}" for ${locator}`);
        await expect(locator).toHaveAttribute(attribute, expectedAttributeValue);
        this.logger.info(`Attribute "${attribute}" matches expected value "${expectedAttributeValue}" for ${locator}`);
    }

    /**
     * Assert that the element's attribute does NOT have the specified value.
     * @param locator - The Playwright locator.
     * @param attribute - The attribute name.
     * @param value - The value that should NOT be present.
     */
    async assertNotToHaveAttribute(locator: Locator, attribute: string, value: string) {
        this.logger.info(`Checking attribute "${attribute}" does NOT equal "${value}" for ${locator}`);
        await expect(locator).not.toHaveAttribute(attribute, value);
        this.logger.info(`Attribute "${attribute}" does NOT match value "${value}" for ${locator}`);
    }

    /* -------------------- Class -------------------- */

    /**
     * Assert that the element has the specified class.
     * @param locator - The Playwright locator.
     * @param expectedClassName - The expected class name.
     */
    async assertToHaveClass(locator: Locator, expectedClassName: string | RegExp) {
        this.logger.info(`Checking if element has class: "${expectedClassName}" for ${locator}`);
        await expect(locator).toHaveClass(expectedClassName);
        this.logger.info(`Element has class: "${expectedClassName}" for ${locator}`);
    }

    /**
     * Assert that the element does NOT have the specified class.
     * @param locator - The Playwright locator.
     * @param className - The class name that should NOT be present.
     */
    async assertNotToHaveClass(locator: Locator, className: string | RegExp) {
        this.logger.info(`Checking if element does NOT have class: "${className}" for ${locator}`);
        await expect(locator).not.toHaveClass(className);
        this.logger.info(`Element does NOT have class: "${className}" for ${locator}`);
    }

    /* -------------------- Count -------------------- */

    /**
     * Assert that the element count matches the expected count.
     * @param locator - The Playwright locator.
     * @param count - The expected number of elements.
     */
    async assertToHaveCount(locator: Locator, count: number) {
        this.logger.info(`Checking element count equals ${count} for ${locator}`);
        await expect(locator).toHaveCount(count);
        this.logger.info(`Element count matches expected: ${count} for ${locator}`);
    }

    /**
     * Assert that the element count does NOT match the specified count.
     * @param locator - The Playwright locator.
     * @param count - The count that should NOT match.
     */
    async assertNotToHaveCount(locator: Locator, count: number) {
        this.logger.info(`Checking element count does NOT equal ${count} for ${locator}`);
        await expect(locator).not.toHaveCount(count);
        this.logger.info(`Element count does NOT match: ${count} for ${locator}`);
    }

}
