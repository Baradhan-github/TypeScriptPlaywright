import { test, TestInfo } from "@playwright/test";
import { HomePage } from "../pages/homePage.ts";
import { SearchHotelPage } from "../pages/searchHotelPage.ts";
import { SelectHotelPage } from "../pages/selectHotelPage.ts"
import { Validations } from "../utils/playwright.core.util/validation.utils.ts";
import { setUpTestHooks as testHooks } from "../testHooks.ts";
import { encUsername, encPassword } from '../config/environment';
import searchData from '../data/searchPage.json'
import selectData from '../data/selectHotel.json'

test.describe("Search Page Tests", () => {

    let homePage: HomePage, searchPage: SearchHotelPage, selectHotel: SelectHotelPage, assert: Validations;

    const { beforeEach, afterEach } = testHooks("Search Page Tests");

    test.beforeEach(async ({ page }, testInfo: TestInfo) => {
        await beforeEach({ page }, testInfo);
        homePage = new HomePage(page);
        searchPage = new SearchHotelPage(page);
        selectHotel = new SelectHotelPage(page);
        assert = new Validations(page);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await afterEach({ page }, testInfo);
    });

    test("Search Page Test funcionality check", async ({ page }) => {
        await test.step("Verify Login and navigate to Search Hotel Page", async () => {
            // await page.pause();
            await assert.assertElementIsVisible(homePage.appLogo);
            await homePage.loginMethod(encUsername, encPassword);
            await assert.assertElementIsVisible(searchPage.searchHotelText);
        });

        await test.step("Verify the functionalities of user interactions on Search Hotel Page", async () => {
            await searchPage.selectLocation(searchData.searchPageData.location);
            await searchPage.selectHotel(searchData.searchPageData.hotel);
            await searchPage.selectRoomType(searchData.searchPageData.roomType);
            await searchPage.selectNumberOfRooms(searchData.searchPageData.numberOfRooms);
            await searchPage.enterCheckInDate(searchData.searchPageData.checkInDate);
            await searchPage.enterCheckOutDate(searchData.searchPageData.checkOutDate);
            await searchPage.selectAdultsPerRoom(searchData.searchPageData.adultsPerRoom);
            await searchPage.selectChildrenPerRoom(searchData.searchPageData.childrenPerRoom);
            await searchPage.clickSearchButton();
        });

        await test.step("Verify the navigation to select hotel page", async ()=>{
            await assert.assertElementIsVisible(selectHotel.selectHotelHeadingText);
        });

    });


});