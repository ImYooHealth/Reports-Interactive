import React from "react"

import * as d3v4 from './d3.v4.js';
import { readCSVFile } from './utils.js';

var filename = 'http://localhost:8000/Experiments/React/dashboard-v4-cra/src/components/color_select.csv'

const Circle = ({cx, cy}) => {
    const svgRef = React.useRef(null)

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = + 500 - margin.top - margin.bottom; 

    var colors = readCSVFile(filename)
    // For some reason, this cannot be dereferenced inside useEffect. 
    var selected_color = colors[0]['COLOR']

    React.useEffect(() =>  {
        const svgEl = d3v4.select(svgRef.current)
        svgEl.selectAll("*").remove()

        svgEl
            .append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', 40)
            .style('fill', selected_color)
            .style('stroke-width', "3")
            .style('stroke', 'black')

        const measured_width = d3v4.select('.the_circle').node().getBoundingClientRect().width
        const measured_height = d3v4.select('.the_circle').node().getBoundingClientRect().height;

        d3v4.select('circle')
            .attr('cx', measured_width / 2)
            .attr('cy', measured_height / 2)
    }, [selected_color])

    return (
      <div>
        <svg ref={svgRef} width={200} height={200}>
        </svg>
      </div>
        );
}

export default Circle
