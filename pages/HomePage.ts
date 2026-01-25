import { Page, Locator } from "playwright";
import { ActionUtils } from "../utils/playwright.core.util/Playwright.utils";

export class HomePage {
    // Private fields
    private page: Page;
    private readonly _userNameField: Locator;
    private readonly _passWordField: Locator;
    private readonly _loginButton: Locator;
    private readonly _forgetPasswordLink: Locator;
    private readonly _appLogo: Locator;
    private readonly _newUserLink: Locator;
    private readonly _locationDropdown: Locator;
    private readonly actions: ActionUtils;

    /**
     * Constructor for HomePage
     * @param {Page} page - The Playwright Page object
     */
    constructor(page: Page) {
        this.page = page;
        this.actions = new ActionUtils(page);

        this._userNameField = page.locator('#username');
        this._passWordField = page.locator('#password');
        this._loginButton = page.getByRole("button", { name: "Login" });
        this._forgetPasswordLink = page.getByRole('link', { name: "Forgot Password?" });
        this._newUserLink = page.getByRole('link', { name: 'New User Register Here' });
        this._appLogo = page.locator("img.logo[alt='Adactin Group']");
        this._locationDropdown = page.getByRole('combobox', { name: 'Location' });
    }



    // Getters
    /**
     * Gets the app logo locator
     */
    get appLogo(): Locator {
        return this._appLogo;
    }

    /**
     * Gets the location dropdown locator
     */
    get locationDropdown(): Locator {
        return this._locationDropdown;
    }



    // Actions
    /**
     * Fills in the username field with the given input
     * @param {string} username - Username input from the user
     * @returns {Promise<void>}
     */
    async setUsername(username: string): Promise<void> {
        await this.actions.fillElement(this._userNameField, username);
    }

    /**
     * Fills in the password field with the given input
     * @param {string} password - Password input from the user
     * @returns {Promise<void>}
     */
    async setPassword(password: string): Promise<void> {
        await this.actions.fillElement(this._passWordField, password);
    }

    /**
     * Clicks the login button
     * @returns {Promise<void>}
     */
    async clickLoginButton(): Promise<void> {
        await this.actions.clickElement(this._loginButton);
    }

    /**
     * Clicks the forget password link
     * @returns {Promise<void>}
     */
    async clickForgotPasswordLink(): Promise<void> {
        await this.actions.clickElement(this._forgetPasswordLink);
    }

    /**
     * Clicks the new user registration link
     * @returns {Promise<void>}
     */
    async clickNewUserLink(): Promise<void> {
        await this.actions.clickElement(this._newUserLink);
    }

    /**
     * Performs the complete login process
     * @param {string} username - Username for login
     * @param {string} password - Password for login
     * @returns {Promise<void>}
     */
    async loginMethod(username: string, password: string): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickLoginButton();
    }
}