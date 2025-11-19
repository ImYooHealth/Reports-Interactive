import *  as CommonUtils from './../../CommonUtils'


export const dataPath = CommonUtils.dataPath + 'GeneAbundance/'
//var deployed = false;

//export const dataPath = deployed ? 'https://samplereportdata.imyoo.health/GeneAbundance/' : 'http://localhost:31339/GeneAbundance/'
//export const feedbackPath = deployed ? 'https://samplereportfeedback.imyoo.health/' : 'http://localhost:31338/'

const max_genes = 500  // Not to exceed 4999

export async function getGeneDescriptions() {
    const rawDescriptionData = await readCSVFile(dataPath + 'GeneDescriptions', false)

    // Repackage as name:description dictionary
    var descriptionLookup = {}
    for(var row of rawDescriptionData) {
        // Cleanup
        if(row['gene_description'][0] == '"') {
            row['gene_description'] = row['gene_description'].slice(1)
        }
        descriptionLookup[row['gene_name']] = row['gene_description']
    }

    return descriptionLookup
}

export async function readCSVFile(filePath, enforceMax = true) {

  filePath += '.csv'
  
  try {
    const response = await fetch(filePath);
    
    // Check for HTTP errors
    if (!response.ok) {
      console.error(`Failed to load ${filePath}: HTTP ${response.status}`);
      throw new Error(`Failed to load file: ${filePath} (HTTP ${response.status})`);
    }
    
    const csvData = await response.text();
    
    // Check if response is empty
    if (!csvData || csvData.trim().length === 0) {
      console.error(`Empty response from ${filePath}`);
      throw new Error(`Empty response from: ${filePath}`);
    }
    
    const rows = csvData.split("\n");
    const headerRow = rows[0].replace('\r', '').split(",");
    var dataRows = rows.slice(1);
    // Remove empty rows at the end that trigger nans
    if (dataRows.slice(-1).length < headerRow.length) {
      dataRows = dataRows.slice(0, -1);
    }

    if(dataRows < max_genes) {
        max_genes = dataRows
        console.log('Warning: utils.js: max_genes > dataRows')
    }

    const result = [];
    for (let i = 0; i < dataRows.length; i++) {
      if(enforceMax) {
          if(i >= max_genes) {
              break
          }
      }
      const dataRow = dataRows[i].replace('\r', '').split(",");
      const obj = {};
      for (let j = 0; j < headerRow.length; j++) {
        obj[headerRow[j]] = dataRow[j];
      }
      result.push(obj);
    }

    // Validate
    if(result[0] && result[0]['<!DOCTYPE html>'] === undefined)  {
      return result;
    } else {
      throw new Error('You got the path wrong bozo\nYou said:\n' + filePath +
          "\n\nIf you feel you've reached this error in error, please delete and try " +
          "something else.")
    }
  } catch (error) {
    console.error(`Error reading CSV file ${filePath}:`, error);
    throw error;
  }
}

export async function getGenesForDropdown() {
    let response = await readCSVFile(dataPath + 'gene_list')
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


export async function getGenes() {
    let response = await readCSVFile(dataPath + 'gene_list')
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