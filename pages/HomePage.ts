import { Page, Locator } from "playwright";
import { ActionUtils } from "../utils/playwright-core/Playwright.utils";

export class HomePage {


    // instance
    private page: Page;
    private readonly _userNameField: Locator;
    private readonly _passWordField: Locator;
    private readonly _loginButton: Locator;
    private readonly _forgetPasswordLink: Locator;
    private readonly _appLogo: Locator;
    private readonly _newUserLink: Locator;
    private actions: ActionUtils;


    // constructor
    constructor(page: Page) {
        this.page = page;

        this._userNameField = page.locator('table #username');
        this._passWordField = page.locator('table #password');
        this._loginButton = page.getByRole("button", { name: "Login" });
        this._forgetPasswordLink = page.getByRole('link', { name: "Forgot Password?" });
        this._newUserLink = page.getByRole('link', { name: 'New User Register Here' })
        this._appLogo = page.getByAltText("Adactin Group");
        this.actions = new ActionUtils(page);
    }


    // getters
    get userNameField(): Locator { return this._userNameField; }
    get passWordField(): Locator { return this._passWordField; }
    get loginButton(): Locator { return this._loginButton; }
    get forgetPasswordLink(): Locator { return this._forgetPasswordLink; }
    get newUserLink(): Locator { return this._newUserLink; }
    get appLogo(): Locator { return this._appLogo; }


    // actions

    /**
     * Fills in the username field with the given input.
     * @param {string} name - username input from the user.
     */
    async setUsername(name: string) {
        await this.actions.fillElement(this._userNameField, name)
    }


    /**
     * Fills in the password fiels with the given input.
     * @param {string} pass - password input from the user.
     */
    async setPassword(pass: string): Promise<void> {
        await this.actions.fillElement(this._passWordField, pass);
    }


    /**
     * Clicks the login button
     */
    async clickLoginButton(): Promise<void> {
        await this.actions.clickElement(this._loginButton);
    }


    /**
     * Clicks the forget password link
     */
    async clickForgrtPasswordLink(): Promise<void> {
        await this.actions.clickElement(this._forgetPasswordLink);
    }


    /**
     * Clicks the new user link
     */
    async clickNewUserLink(): Promise<void> {
        this.actions.clickElement(this._newUserLink);
    }


    /**
     * complete method for login process
     * @param {string} name - provide username
     * @param {string} pass - provide password
     */
    async loginMethod(name: string, pass: string) {
        await this.setUsername(name);
        await this.setPassword(pass);
        await this.clickLoginButton();
    }
    
}