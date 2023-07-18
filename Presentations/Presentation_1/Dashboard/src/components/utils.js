export function readCSVFile(filePath) {
  filePath += '.csv'
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

export default readCSVFile;


// Deployed
//const dataPath = 'https://samplereportdata.imyoo.health/'

// Local
const dataPath = 'http://localhost:31339/'

export function getGenesForDropdown() {
    let response = readCSVFile(dataPath + 'gene_list')
    var genes = [];

    for (const obj of response) {
      const keys = Object.keys(obj);
      for (const key of keys) {
        var item = {}
        item['value'] = obj[key]
        item['label'] = obj[key]
        genes.push(item)
      }
    }

    return genes;
}


export function getGenes() {
    let response = readCSVFile(dataPath + 'gene_list')
    const genes = [];

    for (const obj of response) {
      const keys = Object.keys(obj);
      for (const key of keys) {
        genes.push(obj[key]);
      }
    }

    return genes
}


export var cellTypes = [
    {
        'value': 'Monocytes',
        'label': 'Monocytes'
    },
    {
        'value': 'B Cells',
        'label': 'B Cells'
    },
    {
        'value': 'NK Cells',
        'label': 'NK Cells'
    },
    {
        'value': 'T Cells',
        'label': 'T Cells'
    },
];


export function getCellTypes() {
    return cellTypes
}