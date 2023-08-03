import React, { useState } from 'react';
import './dropdown_limit_scroll.css';

const Dropdown_limit_scroll = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelection = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    handleDropdownToggle();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const calculateMaxHeight = () => {
    const maxItems = 10; // Set the desired maximum number of items to display
    const itemHeight = 40; // Set the height of each dropdown menu item
    const totalHeight = maxItems * itemHeight;
    return `${totalHeight}px`;
  };

  return (
    <div className={`custom-dropdown ${isDropdownOpen ? 'open' : ''}`}>
      <div className="dropdown-selected" onClick={handleDropdownToggle}>
        {selectedOption || 'Select an option'}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-options" style={{ maxHeight: calculateMaxHeight() }}>
          {options.map((option, index) => (
            <li key={index} className="dropdown-option" onClick={handleSelection}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown_limit_scroll;
