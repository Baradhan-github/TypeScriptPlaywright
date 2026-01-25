import { test, TestInfo } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { Validations } from "../utils/playwright.core.util/validation.utils";
import { encUsername, encPassword } from '../config/environment';
import { setUpTestHooks as testHooks } from "../testHooks";
import { SearchHotelPage } from "../pages/searchHotelPage";


test.describe("Home Page Tests", () => {

    let homePage: HomePage, searchPage: SearchHotelPage, assert: Validations;

    const { beforeEach, afterEach } = testHooks("Home Page Tests");

    test.beforeEach(async ({ page }, testInfo: TestInfo) => {
        await beforeEach({ page }, testInfo);
        homePage = new HomePage(page);
        searchPage = new SearchHotelPage(page);
        assert = new Validations(page);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await afterEach({ page }, testInfo);
    });

    test("Home Page Test", async ({ page }) => {

        await test.step("Verify Login and navigate to Search Hotel Page", async () => {
            await assert.assertElementIsVisible(homePage.appLogo);
            await homePage.loginMethod(encUsername, encPassword);
        });


        await test.step("Verify Navigation to Search Hotel Page", async () => {
            await assert.assertElementIsVisible(searchPage.searchHotelText);
        });
    });

});


