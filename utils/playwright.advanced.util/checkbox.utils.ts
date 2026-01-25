import { Locator, Page } from "playwright/test";
import { ActionUtils } from "../playwright.core.util/Playwright.utils";

export class CheckBoxUtils {


    private actions: ActionUtils;
    constructor(private page: Page) {
        this.actions = new ActionUtils(page);
    }


    /**
   * This is an utility method helps to select radio button.
   * @param {Locator} locator - Pass the loctor for radio button.
   * @remark
   * if there is multiple radio buttion selection, provide it through single xpath
   * @example
   * ```ts
   * const radio = await page.locator('locator');
   * radio.check();
   * ```
   * @public
  */
    async selectRadioButton(locator: Locator) {
        try {
            await locator.check();
        } catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method that helps to select a check box.
    * @param {Locator} locator - Pass the loctor of check box.
    * @example
    * ```ts
    * const checkbox = await page.locator('locator');
    * checkbox.check();
    * ```
    * @public
   */
    async selectCheckBox(locator: Locator) {
        try {
            if (!(await locator.isChecked())) {
                await locator.check();
            }
        } catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method that helps to unselect a check box.
    * @param {Locator} locator - Pass the loctor of check box.
    * @example
    * ```ts
    * const checkbox = await page.locator('locator');
    * checkbox.unCheck();
    * ```
    * @public
   */
    async unSelectCheckBox(locator: Locator) {
        try {
            if (await locator.isChecked()) {
                await locator.uncheck();
            }
        } catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method that helps to select all the check box of all the locators.
    * @param {Locator} locator - Pass the loctor of check box.
    * @public
    */
    async selectAllCheckBoxes(locator: Locator) {
        try {
            const checkBoxArray: Locator[] = await this.actions.getAllLocators(locator);
            for (const s of checkBoxArray) {
                if (!(await s.isChecked())) {
                    await s.check();
                }
            }
        }
        catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method that helps to unselect all the check box of all the locators.
    * @param {Locator} locator - Pass the loctor of check box.
    * @public
    */
    async unSelectAllChechBoxes(locator: Locator) {
        try {
            const checkBoxArray: Locator[] = await this.actions.getAllLocators(locator);
            for (const s of checkBoxArray) {
                if (await s.isChecked()) {
                    await s.uncheck();
                }
            }
        } catch (error) {
            throw error;
        }
    }


    /**
    * This is an utility method that helps get the count for the locator.
    * @param {Locator} locator - Pass the loctor of check box.
    * @public
    */
    async checkBoxCount(locator: Locator) {
        try {
            let count = 0;
            const checkBoxArray: Locator[] = await this.actions.getAllLocators(locator);
            for (const s of checkBoxArray) {
                if (await s.isChecked()) {
                    count++;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }

}