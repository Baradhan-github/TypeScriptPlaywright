import { Locator, Page } from "playwright/test";
import { Validations } from "../playwright-core/validation.utils";
import { ActionUtils } from "../playwright-core/Playwright.utils";

export class DropDownUtils{

    private validate;
    private playwrightutil;

    constructor(private page:Page){ 
        this.validate = new Validations(page);
        this.playwrightutil = new ActionUtils(page);
    }


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
    async selectDropdown(locator:Locator, inputType: "text" | "value" | "label", inputValue:string){
        try {
            switch(inputType){
                case "text":
                    await locator.selectOption(inputValue);
                case "value":
                    await locator.selectOption({label:inputValue});
                case "label":
                    await locator.selectOption({value:inputValue});
                default:
                    throw new Error("unsupported inputValue");
            }
        } catch (error) {
            throw error;
        }
    }


    /**
     * Check whether the dropdown count is as expected
     * @param {Locator} locator - provide the locator of the dropdown element.
     * @param {number} expNumber - provide the expected number of dropdown.
     * @public
     */
    async countDropdownOptions(locator:Locator, expNumber:number){
        this.validate.assertToHaveCount(locator, expNumber, true);
    }
}