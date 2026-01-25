import {Page, Locator} from "@playwright/test";
import { DropDownUtils } from "../utils/playwright.advanced.util/dropdown.utils";
import { ActionUtils } from "../utils/playwright.core.util/Playwright.utils";

export class SearchHotelPage {
    readonly page: Page;
    readonly dropdown: DropDownUtils;
    readonly actions: ActionUtils
    private readonly _SearchHotelText:Locator;
    private readonly _locationDropdown: Locator;
    private readonly _hotelsDropdown: Locator;
    private readonly _roomTypeDropdown: Locator;
    private readonly _numberOfRoomsDropdown: Locator;
    private readonly _checkInDateField: Locator;
    private readonly _checkOutDateField: Locator;
    private readonly adultsPerRoomDropdown: Locator;
    private readonly childrenPerRoomDropdown: Locator;
    private readonly _searchButton: Locator;
    private readonly _resetButton: Locator;
    private readonly usernameText: Locator;

    // constructors
    constructor(page: Page) {
        this.page = page;
        this.dropdown = new DropDownUtils(page);
        this.actions = new ActionUtils(page);
        this._SearchHotelText = page.getByRole('cell', { name: 'Search Hotel (Fields marked with Red asterix (*) are mandatory)', exact: true });
        this._locationDropdown = page.locator('#location');
        this._hotelsDropdown = page.locator('#hotels');
        this._roomTypeDropdown = page.locator('#room_type');
        this._numberOfRoomsDropdown = page.locator('#room_nos');
        this._checkInDateField = page.locator('#datepick_in');
        this._checkOutDateField = page.locator('#datepick_out');
        this.adultsPerRoomDropdown = page.locator('#adult_room');
        this.childrenPerRoomDropdown = page.locator('#child_room');
        this._searchButton = page.getByRole('button', { name: 'Search' });
        this._resetButton = page.getByRole('button', { name: 'Reset' });
        this.usernameText = page.locator('#username_show');
    }

    // getters

    /**
     * Get the Search Hotel Text Locator for validation
     */
    get searchHotelText(): Locator {
        return this._SearchHotelText;
    }

    // methods

    /**
     * Method to select location from dropdown
     * @param location: string
     * @returns {Promise<void>}
     */
    async selectLocation(location: string) {
        await this.dropdown.selectDropdown(this._locationDropdown, location);
    }

    /**
     * Method to select hotel from dropdown
     * @param hotel: string
     * @returns {Promise<void>}
     */
    async selectHotel(hotel: string) {
        await this.dropdown.selectDropdown(this._hotelsDropdown, hotel);
    }

    /**
     * Method to select room type from dropdown
     * @param roomType: string
     * @returns {Promise<void>}
     */
    async selectRoomType(roomType: string) {
        await this.dropdown.selectDropdown(this._roomTypeDropdown, roomType);
    }

    /**
     * Method to select number of rooms from dropdown
     * @param numberOfRooms: string 
     * @returns {Promise<void>}
     */
    async selectNumberOfRooms(numberOfRooms: string) {
        await this.dropdown.selectDropdown(this._numberOfRoomsDropdown, numberOfRooms);
    }

    /**
     * Method to select checkin date from dropdown
     * @param date: string
     * @returns {Promise<void>}
     */
    async enterCheckInDate(date: string) {
        await this.actions.fillElement(this._checkInDateField, date);
    }

    /**
     * Method to select checkout data from dropdown
     * @param date: string
     * @returns {Promise<void>}
     */
    async enterCheckOutDate(date: string) {
        await this.actions.fillElement(this._checkOutDateField, date);
    }

    /**
     * Method to select adult counts from dropdown
     * @param adults 
     * @returns {Promise<void>}
     */
    async selectAdultsPerRoom(adults: string) {
        await this.dropdown.selectDropdown(this.adultsPerRoomDropdown, adults);
    }

    /**
     * Method to select chilldren count from dropdown
     * @param children 
     * @returns {Promise<void>}
     */
    async selectChildrenPerRoom(children: string) {
        await this.dropdown.selectDropdown(this.childrenPerRoomDropdown, children);
    }

    /**
     * Method to select location from dropdown 
     * @returns {Promise<void>}
     */
    async clickSearchButton() {
        await this._searchButton.click();
    }





}