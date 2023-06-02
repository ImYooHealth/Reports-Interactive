#!/Users/imyoo/.nvm/versions/node/v16.15.0/bin/node

const fs = require('fs');

function readCSVFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n')
    const results = []

    for(let i = 1; i < lines.length; i++) {
        results.push(lines[i])
    }


    return results;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

function writeJSONToFile(data, filePath) {
  try {
    // Convert the JSON object to a string
    let jsonString = JSON.stringify(data, null, 2);

    jsonString = 'var genes = ' + jsonString
    jsonString = jsonString + '\n\nexport default genes;\n'


    // Write the string to the specified file
    fs.writeFileSync(filePath, jsonString);

    console.log('JSON data has been written to the file:', filePath);
  } catch (error) {
    console.error('Error occurred while writing JSON to file:', error);
  }
}

function convert(array) {
    const result = [];

    array.forEach(
        (item) => {
            console.log('item: ' + item)
            console.log('type: ' + typeof(item))
            console.log('\n\n-----\n')

            result.push(
                {'value': item, 'label': item}
            )
        }
    );

    return result
}

writeJSONToFile(
    convert(
        readCSVFile(
            'gene_list.csv'
        )
    ),

    'geneList.js'

)
