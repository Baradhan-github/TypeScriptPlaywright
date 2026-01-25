import { Locator, Page } from "playwright/test";
import { Validations } from "../playwright.core.util/validation.utils";
import { ActionUtils } from "../playwright.core.util/Playwright.utils";

export class DropDownUtils {

    // instance
    private validate;
    private playwrightutil;


    // constructor
    constructor(private page: Page) {
        this.validate = new Validations(page);
        this.playwrightutil = new ActionUtils(page);
    }


    //methods
    /**
     * Selects the dropdown element
     * @param {Locator} locator - provide the locator of the dropdown element. 
     * @param {boolean} inputType  - provide the type of value to use | text | Value | label |.
     * @remark
     * inputType parameters
     * text - Text from the dropdown.
     * value - text Value from the dom for dropdown element.
     * label - Label of the dropdown element.
     * @public
     */
    async selectDropdown(locator: Locator, inputValue: string, inputType: "text" | "value" | "label" = "text") {
        switch (inputType) {
            case "text":
            case "label":
                await locator.selectOption({ label: inputValue });
                break;

            case "value":
                await locator.selectOption({ value: inputValue });
                break;

            default:
                throw new Error(`Unsupported inputType: ${inputType}`);
        }
    }


    /**
     * Check whether the dropdown count is as expected
     * @param {Locator} locator - provide the locator of the dropdown element.
     * @param {number} expNumber - provide the expected number of dropdown.
     * @public
     */
    async countDropdownOptions(locator: Locator, expNumber: number) {
        await this.validate.assertToHaveCount(locator, expNumber);
    }

}