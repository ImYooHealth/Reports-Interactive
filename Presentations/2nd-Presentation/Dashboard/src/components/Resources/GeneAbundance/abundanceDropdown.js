import React, { CSSProperties } from 'react';
import Select from 'react-select';

import * as AbundanceUtils from './abundance-utils.js'

function AbundanceDropdown({options, setSelectedOption, selectedOption}) {
    console.log(options)
    var initialValue = {value: selectedOption, label: selectedOption}
  const [displayedValue, setDisplayedValue] = React.useState(initialValue);
/*
    console.log(options[0])
        console.log('-----------')
  console.log(selectedOption)
      console.log('-----------')
*/
  // Dev
  const [inputText, setInputText] = React.useState('');
  const [sendText, setSendText] = React.useState("Send!")

  const handleClickSend = () => {
    setSendText(sendText === "Send!" ? "Sent!" : "Send!")
    setSelectedOption(options[5])
        setDisplayedValue(options[5])
    setInputText('')
  }

  const handleSelectChange = (option) => {
    setSelectedOption(option.value);
        console.log('-----------')
    console.log(displayedValue)
    setDisplayedValue(option)
    console.log(displayedValue)
        console.log('-----------')
  }

  const handleInputChange = (event) => {
    setSendText(sendText === "Sent!" ? "Send!" : "Send!")
    setInputText(event.target.value)
  }

  React.useEffect(() => {
    console.log('Parent state changed')
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
