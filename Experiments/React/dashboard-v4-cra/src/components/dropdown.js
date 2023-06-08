import React, { CSSProperties } from 'react';
import Select from 'react-select';

import * as AbundanceUtils from './abundance-utils.js'

function Dropdown(props) {
  const [selectedOption, setSelectedOption] = React.useState(null);

  return (
      <Select 
        value={selectedOption}
        options={props.options}
        onChange={props.handleChange}
      />
  )
};

export default Dropdown;
