function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {name: "Sort By Name", functionName: "sortByName"}
  ];
  spreadsheet.addMenu("Script Center Menu", entries);
}

function sortByName() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.sort(1);
}