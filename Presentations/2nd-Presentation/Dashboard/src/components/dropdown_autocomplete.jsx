import React, { useState } from 'react';
import './dropdown-autocomplete.css'

const DropdownAutocomplete = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSelection = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

const handleInputChange = (event) => {
  const { value } = event.target;
  const filtered = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );
  const limitedFiltered = filtered.slice(0, 10); // Limit to the first 10 options
  setFilteredOptions(limitedFiltered);
  setSelectedOption(value);
  setIsDropdownOpen(true);
};

  return (
    <div className={`custom-dropdown ${isDropdownOpen ? 'open' : ''}`}>
      <input
        type="text"
        value={selectedOption}
        onChange={handleInputChange}
        onClick={handleDropdownToggle}
        className="dropdown-input"
        placeholder="Select an option"
      />
      {isDropdownOpen && (
        <ul className="dropdown-options">
          {filteredOptions.map((option, index) => (
            <li key={index} className="dropdown-option" onClick={handleSelection}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownAutocomplete;
