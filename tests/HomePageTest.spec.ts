import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { Validations } from "../utils/playwright-core/validation.utils.ts";
import { TestConfig } from "../test.config.ts";


let homePage: HomePage;
let config: TestConfig
let assert: Validations;


test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    assert = new Validations(page);
});


test("Home Page Test", async ({ page }) => {
    await assert.assertElementIsVisible(homePage.newUserLink, true);
    await homePage.loginMethod(config.userName, config.passWord);
});