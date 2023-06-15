import React, { CSSProperties } from 'react';
import Select from 'react-select';

import * as AbundanceUtils from './abundance-utils.js'

function Dropdown(props) {
  const [selectedOption, setSelectedOption] = React.useState(props.options[0]);

  const handleSelectChange = (option) => {
    setSelectedOption(option);

    props.handleChange(option);
  }
  
  return (
      <Select 
        value={selectedOption}
        options={props.options}
        onChange={handleSelectChange}
      />
  )
};

export default Dropdown;
