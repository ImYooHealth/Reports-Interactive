import React, { CSSProperties } from 'react';
import Select from 'react-select';
//import { colourOptions, groupedOptions } from './docs/data';

import * as utils from './utils.js'
import genes from '../Data/geneList1000.js'
//console.log(genes)

/*
//const data = utils.readCSVFile('http://localhost:8000/Experiments/React/dashboard-v4-cra/src/Data/gene_list.csv')
//console.log(data)

/*
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles: CSSProperties = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

*/
function Dropdown() {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleChange = (selectedOption) => {
    utils.handleChange(selectedOption)
  }


  return (
      <Select 
        value={selectedOption}
        options={genes}
        onChange={handleChange}
      />
  )
  /*
  <Select
    defaultValue={genes[1]}
    options={genes}
    formatGroupLabel={formatGroupLabel}
  />
  */

};

export default Dropdown;