/* Code developed in Google Script Editor of Google Doc's Spreadsheet. This code is designed to be used
 * on a spreadsheet that the UMM Concert Choir uses to keep track of and organize the concert dresses and
 * tuxes.
 *
 * Author: Emma Sax
 */

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {name: "Sort By Name", functionName: "sortByName"},
    {name: "Delete Empty Rows", functionName: "deleteEmptyRows"},
    {name: "Delete Phone Numbers", functionName: "deletePhoneNumbers"}
  ];
  spreadsheet.addMenu("Extra Features", entries);
}

/* This function is designed to sort the current sheet by first name iff "Name" is what
 * is in the first column of the first row.
 */
function sortByName() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet;
  var rangeOfRowOne = spreadsheet.getRange(1,1);
  var valueOfRowOne = rangeOfRowOne.getValue();

  if (valueOfRowOne === "Name") {
    spreadsheet.sort(1);
    SpreadsheetApp.getActiveSpreadsheet().toast("Successfully sorted alphabetically by name.");
  } else {
    SpreadsheetApp.getActiveSpreadsheet().toast("Did not sort alphabetically by name.");
  }
}

/* This function is designed to look at the current sheet, and delete all rows
 * that have the first column A empty. So for the purposes of this spreadsheet,
 * it will delete any row that does not have a name assigned to a row.
 * The code was taken from and adapted from:
 * http://stackoverflow.com/questions/11058019/delete-a-row-in-google-spreadsheets-if-value-of-cell-in-said-row-is-0-or-blank
 */
function deleteEmptyRows(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet;
  var rows = spreadsheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var numDeleted = 0;

  for (var i = 0; i < numRows; i++) {
    var currentRow = values[i];
    if (currentRow[0] === '') {
      spreadsheet.deleteRow((parseInt(i)+1) - numDeleted);
      numDeleted++;
    }
  }

  SpreadsheetApp.getActiveSpreadsheet().toast("Successfully removed " + numDeleted + " row(s).");
}

/* This function is designed to delete the data in the particular active sheet iff the second column of the first row
 * has "Phone Number" written in.
 * The code was taken from and adapted from:
 * http://stackoverflow.com/questions/14109538/trying-to-read-cell-1-1-in-spreadsheet-using-google-script-api
 */
function deletePhoneNumbers(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet;
  var rows = spreadsheet.getDataRange();
  var numRows = rows.getNumRows();
  var rangeOfRowOne = spreadsheet.getRange(1,2);
  var valueOfRowOne = rangeOfRowOne.getValue();

  if (valueOfRowOne === "Phone Number") {
    for (var i = 0; i < numRows; i++) {
      var range = spreadsheet.getRange("B2:B");
      range.clearContent();
    }
    SpreadsheetApp.getActiveSpreadsheet().toast("Successfully deleted all phone numbers in this sheet.");
  } else {
    SpreadsheetApp.getActiveSpreadsheet().toast("Did not delete any phone numbers.");
  }
}
