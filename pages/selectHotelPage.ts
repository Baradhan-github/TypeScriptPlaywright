import {Page, Locator} from '@playwright/test';
import { CheckBoxUtils } from '../utils/playwright.advanced.util/checkbox.utils';
import { ActionUtils } from '../utils/playwright.core.util/Playwright.utils';

export class SelectHotelPage {

    readonly page: Page;
    readonly checkBox: CheckBoxUtils
    readonly actions: ActionUtils
    private readonly _selectHotelText: Locator;
    private readonly _firstRadiElement: Locator;
    private readonly _hotelColumnFirst: Locator
    private readonly _continueButton:Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkBox = new CheckBoxUtils(page);
        this.actions = new ActionUtils(page);
        this._selectHotelText = page.locator('#select_form');
        this._firstRadiElement = page.locator('#radiobutton_0');
        this._hotelColumnFirst = page.locator('#hotel_name_0')
        this._continueButton = page.getByRole('button', { name: 'Continue' });
    }

    // getters

    /**
     * Get the select hotel text for validation
     */
    get selectHotelHeadingText(): Locator {
        return this._selectHotelText;
    }

    get hotelColumnFirstText(): Locator {
        return this._hotelColumnFirst;
    }

    // methods

    /**
     * Method to check select hotel radio button 
     */
    async clickRadioButton(){
        await this.checkBox.selectRadioButton(this._firstRadiElement);
    }

    /**
     * Method to click continue button
     */
    async clickContinueButton(){
        await this.actions.clickElement(this._continueButton);
    }
}