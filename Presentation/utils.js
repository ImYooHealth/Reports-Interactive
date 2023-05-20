// Function definitions
// Read the data and compute summary statistics for each species
function readCSVFile(filePath) {
  const request = new XMLHttpRequest();
  request.open("GET", filePath, false);
  request.send();
  const csvData = request.responseText;
  const rows = csvData.split("\n");
  const headerRow = rows[0].split(",");
  var dataRows = rows.slice(1);
  // Remove empty rows at the end that trigger nans
  if (dataRows.slice(-1).length < headerRow.length) {
    dataRows = dataRows.slice(0, -1);
  }
  const result = [];
  for (let i = 0; i < dataRows.length; i++) {
    const dataRow = dataRows[i].split(",");
    const obj = {};
    for (let j = 0; j < headerRow.length; j++) {
      obj[headerRow[j]] = dataRow[j];
    }
    result.push(obj);
  }
  return result;
}