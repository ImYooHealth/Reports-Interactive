import React from "react"


import * as utils from './utils.js'
import * as VolcanoUtils from './VolcanoUtils.js'
import Dropdown from './dropdown.js'


// Volcano Main
// Gross extrafunctional volcano code from abundance-volcano-305.js
if(false) {

}


function setupCanvas(svg) {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 60},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Create the SVG
    svg.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create axis labels
    create_axis_labels(svg, width, height)


}

// The Volcano component
const Volcano = () => {
    const svgRef = React.useRef(null)

    react.useEffect(() => {
        const svg = d3v3.select(svgRef.current)
        svg.select('*').remove()

        // Volcano SVG initialization

        // Volcano default initialization

    });

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}>
    )
}