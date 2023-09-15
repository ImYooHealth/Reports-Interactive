import React, { CSSProperties } from 'react';
import Select from 'react-select';

import * as AbundanceUtils from './abundance-utils.js'

function AbundanceDropdown({options, setSelectedOption, selectedOption}) {
    console.log(options)
    var initialValue = {value: selectedOption, label: selectedOption}
    const [displayedValue, setDisplayedValue] = React.useState(initialValue);


    const handleSelectChange = (option) => {
        setSelectedOption(option.value);
        setDisplayedValue(option)
    }

    React.useEffect(() => {
        setDisplayedValue({value: selectedOption, label: selectedOption})
    }, [selectedOption]);
  
  return (
        <Select 
            value={displayedValue}
            options={options}
            onChange={handleSelectChange}
        />
  )
};

export default AbundanceDropdown;
