import { Locator, Page } from "playwright/test";

export class TableUtils{


    constructor(page:Page){  }

    //Static tables


    /**
     * Returns the count of number of rows present in a table.
     * @param {Locator} headerLocator - provide the locator of the table.
     * @returns {Promise<number>} - returns the count as number
     * @public
     */
    async gettableRow(headerLocator:Locator): Promise<number>{
        const row = headerLocator.locator("tr");
        return await row.count();
    }


    /**
     * Returns an array of all the data in a table in the form of array
     * @param {Locator} headerLocator - provide the locator of the table.
     * @returns {Promise<string[][]>} - returns the data in an array format
     * @public
     */    
    async getAllTableRows(headerLocator:Locator): Promise<string[][]>{
        const row = headerLocator.locator("tr");
        const rowCount =  await row.count();
        const alldata: string[][] = [];
        for (let i = 0; i < rowCount; i++) {
            const allrows = await row.nth(i).locator("td").allInnerTexts();
            alldata.push(allrows);
        }
        return alldata;
    }


    /**
     * Returns the data in string format from the selected cell with row header and column header.
     * @param {Locator} headerLocator - provide the locator of header locator of the required table.
     * @param {Locator} rowHeaderLocator - provide the locator of row locator of the required table.
     * @param {string} headerCol - provide the string of a particular header name in the required table.
     * @param {string} headerRow - provide the string of a particular row header name in the required table.
     * @returns {Promise<string>} - returns the cell data in string format
     * @public
     */ 
    async getSpecificCell(headerLocator: Locator, rowHeaderLocator: Locator, headerCol:string, headerRow:string): Promise<string>{
        let colIndex:number =-1;
        let rowIndex:number =0;

        let repeat = true;

        const headerCount = await headerLocator.count();
        const rowCount = await rowHeaderLocator.count();
        const headerData:string[] = await headerLocator.allInnerTexts();
        if(headerData.some(i=>i.includes(headerRow))){
            colIndex = headerData.findIndex(i=>i.includes(headerRow))
            if(colIndex===-1){
                return `${headerRow} not found`;
            }
        }
        else{
            return `${headerRow} not found`;
        }

        if(repeat){
            for(let i=0;i<rowCount;i++){
                const tablerow:string[] = await rowHeaderLocator.nth(i).allInnerTexts();
                if(tablerow.some(i=>i.includes(headerCol))){
                    rowIndex = i;
                    repeat = false;
                }
            }
        }
        const finder:string = await rowHeaderLocator.nth(rowIndex).locator("td").nth(colIndex).innerText();

        return finder;
    }
}