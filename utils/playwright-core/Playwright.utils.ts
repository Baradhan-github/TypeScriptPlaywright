import { Locator, Page } from "playwright/test";

export class ActionUtils {


    // constructor
    constructor(private page: Page) { }


    // methods
    /**
    * This is an utility method helps to click the locator element.
    * @param {Locator} locator - Pass clickable type locator element.
    * @throws {Error} if element is not clickable or visible.
    * @example
    * ```ts
    * button:Locator = page.locator('locator');
    * button.click()
    * ```
    * @public
   */
    async clickElement(locator: Locator) {
        try {
            await locator.click();
        }
        catch (error) {
            throw error;
        }
    }


    //===== Text Based ===========

    /**
    * This is an utility method helps to enter the value into textfields.
    * @param {Locator} locator - Pass textfield type locator element.
    * @param {String} text - Pass text or number in the form of string.
    * @example
    * ```ts
    * textBox:Locator = page.locator('locator');
    * textBox.fill("text");
    * ```
    * @public
   */
    async fillElement(locator: Locator, text: string): Promise<void> {
        try {
            await locator.fill(text);
        } catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method helps to get the input value passed in text fields.
    * @param {Locator} locator - Pass locators where text passed inside textfields.
    * @example
    * ```ts
    * textBox:Locator = page.locator('locator').fill("text");
    * textBox.inputValue();
    * ```
    * @public
   */
    async getInputValue(locator: Locator,): Promise<string> {
        try {
            return await locator.inputValue();
        } catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method helps to get the attribute value in the DOM.
    * @param {Locator} locator - Pass the loctor for which the attribute is needed.
    * @returns {Promise<string | null>} returns the attribute value of the given element.
    * @example
    * ```ts
    * const attribute = await page.locator('locator');
    * attribute.getAttribute("commonattributes");
    * ```
    * @public
   */
    async getAttributes(locator: Locator, attribute: string): Promise<string | null> {
        try {
            return await locator.getAttribute(attribute);
        }
        catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method helps to get the visible text of locator.
    * @param {Locator} locator - Pass the loctor for which the visible text is required.
    * @returns {Promise<string>} returns visible text in to what user sees in the screen.
    * @remarks
    * * Excludes hidden element, line breaks and white spaces.
    * * Use when want to verify the visible text on the page.
    * * @example
    * ```ts
    * const text = await page.locator('locator').innerText();
    * ```
    * @public
   */
    async getInnerText(locator: Locator): Promise<string> {
        try {
            return await locator.innerText();
        }
        catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method helps to get the raw text present in the DOM.
    * @param {Locator} locator - Pass the loctor for which the visible text is required.
    * @returns {Promise<string | null>} returns raw text in string format.
    * @remarks
    * * Includes hidden element, line breaks and white spaces.
    * * Use when want to extract text from the DOM.
    * @example
    * ```ts
    * const text = await page.locator('locator').textContent();
    * ```
    * @public
   */
    async getTextContent(locator: Locator): Promise<string | null> {
        try {
            return await locator.textContent();
        }
        catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method helps to get an array of visible text of all the matching elements.
    * @param {Locator} locator - Pass the loctor for which the visible text is required.
    * @returns {Promise<string[]>} returns an array of visible text in to what user sees in the screen.
    * @remarks
    * * Excludes hidden element, line breaks and white spaces.
    * * Use when want to verify the visible text on the page.
    * * @example
    * ```ts
    * const text = await page.locator('locator').innerText();
    * ```
    * @public
   */
    async getAllInnerText(locator: Locator): Promise<string[]> {
        try {
            return await locator.allInnerTexts();
        }
        catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method helps to get an array of raw text present in the DOM.
    * @param {Locator} locator - Pass the loctor for which the visible text is required.
    * @returns {Promise<string[]>} returns an array of raw text in string format.
    * @remarks
    * * Includes hidden element, line breaks and white spaces.
    * * Use when want to extract text from the DOM.
    * @example
    * ```ts
    * const text = await page.locator('locator').allTextContent();
    * ```
    * @public
   */
    async getAllTextContent(locator: Locator): Promise<string[]> {
        try {
            return await locator.allTextContents();
        }
        catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method helps to get an array of individual locator in the DOM.
    * @param {Locator} locator - Pass the loctor for which has multiple similar locators.
    * @returns {Promise<Locator[]>} returns an array of locators in string format.
    * @remarks
    * * Includes hidden element, line breaks and white spaces.
    * * Use when want to extract text from the DOM.
    * @example
    * ```ts
    * const text = await page.locator('locator').all();
    * ```
    * @public
   */
    async getAllLocators(locator: Locator): Promise<Locator[]> {
        try {
            return await locator.all();
        }
        catch (error) {
            throw error;
        }
    }

}