import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import d3 from './d3.js';


const Scatterplot_ex3 = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Function to read data from a file
    const fetchData = async () => {
      try {
        const response = await fetch('path/to/your/data/file.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Function to render the scatterplot using d3
    const renderScatterplot = () => {
      // Clear any existing scatterplot
      d3.select('#scatterplot').selectAll('*').remove();

      // Check if data is available
      if (data.length === 0) return;

      // Select the SVG container
      const svg = d3.select('#scatterplot');

      // Set the dimensions and margins
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      // Calculate the inner width and height
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Create scales
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.x)])
        .range([0, innerWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range([innerHeight, 0]);

      // Create the axes
      const xAxis = d3.axisBottom(xScale).ticks(5);
      const yAxis = d3.axisLeft(yScale).ticks(5);

      // Append the axes to the SVG container
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(yAxis);

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
        .call(xAxis);

      // Create the circles for the scatterplot
      svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x) + margin.left)
        .attr('cy', d => yScale(d.y) + margin.top)
        .attr('r', 4)
        .attr('fill', 'steelblue');
    };

    renderScatterplot();
  }, [data]);

  const handleDropdownChange = selectedOption => {
    setSelectedOption(selectedOption);
    // Read new data based on the selected option
    // You can modify this logic to read data from different files based on the selected option
    fetchData(selectedOption.value);
  };

  return (
    <div>
      <Select
        options={[
          { value: 'data1', label: 'Data 1' },
          { value: 'data2', label: 'Data 2' },
          { value: 'data3', label: 'Data 3' }
        ]}
        value={selectedOption}
        onChange={handleDropdownChange}
      />
      <svg id="scatterplot" width="600" height="400" />
    </div>
  );
};

export default Scatterplot_ex3;