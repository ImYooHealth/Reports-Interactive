import React, { useEffect, useState } from 'react';
import d3v3 from './d3.v3.js'
const d3 = d3v3

const ScatterPlot = () => {
  const [selectedDataset, setSelectedDataset] = useState('dataset1');

  useEffect(() => {
    createChart();
  }, [selectedDataset]);

  const createChart = () => {
    // Define the datasets
    const datasets = {
      dataset1: [
        { x: 1, y: 5 },
        { x: 2, y: 9 },
        { x: 3, y: 7 },
        // ... more data points for dataset1
      ],
      dataset2: [
        { x: 2, y: 4 },
        { x: 4, y: 8 },
        { x: 6, y: 3 },
        // ... more data points for dataset2
      ],
      dataset3: [
        { x: 3, y: 2 },
        { x: 5, y: 6 },
        { x: 7, y: 9 },
        // ... more data points for dataset3
      ],
    };

    // Select the dataset based on the user's choice
    const data = datasets[selectedDataset];

    // Clear the existing chart
    d3.select("#chart").select("svg").remove();

    // Create SVG element within the chart div
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", 400)
      .attr("height", 300);

    // Create scales for x and y axes
    const xScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) => d.x)])
      .range([0, 400]);

    const yScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([300, 0]);

    // Create circles for each data point
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .style("fill", "steelblue");
  };

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="dataset">Select Dataset:</label>
        <select id="dataset" value={selectedDataset} onChange={handleDatasetChange}>
          <option value="dataset1">Dataset 1</option>
          <option value="dataset2">Dataset 2</option>
          <option value="dataset3">Dataset 3</option>
        </select>
      </div>
      <div id="chart" />
    </div>
  );
};

export default ScatterPlot;
