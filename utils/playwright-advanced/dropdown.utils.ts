import { Locator, Page } from "playwright/test";

export class DropDownUtils{



    constructor(private page:Page){  }

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
                    throw new Error("unsupported inputValue")
            }
        } catch (error) {
            throw error;
        }
    }
}