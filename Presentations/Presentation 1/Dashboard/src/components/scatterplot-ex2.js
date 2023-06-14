import React, { useState, useEffect } from 'react';
import readCSVFile from './utils.js'

const volcanoPath = 'http://localhost:8000/Experiments/React/dashboard-v4-cra/src/'
const volcanoDataPath = volcanoPath + 'Data/__secrets__01/Volcanoes/'

const Scatterplot = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Function to read data from file
    const fetchData = async (gene) => {
      // Replace this with your file reading logic
      // For simplicity, I'll use a hard-coded dataset
      const response = await readCSVFile(volcanoDataPath + gene);
      //const jsonData = await response.json();
      setData(response);
    };

    fetchData('COMT'); // Fetch data when the component mounts
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>Scatterplot</h2>

      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      {data.length > 0 && selectedOption && (
        <div>
          <h3>Selected Option: {selectedOption}</h3>
          {/* Render your scatterplot component here using the selected data */}
        </div>
      )}
    </div>
  );
};

export default Scatterplot;