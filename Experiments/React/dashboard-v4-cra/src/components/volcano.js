import React from "react"
import d3v3 from './d3.v3.js'

import * as utils from './utils.js'
import * as VolcanoUtils from './VolcanoUtils.js'
import Dropdown from './dropdown.js'

// State
var width, height, margin, svg
var state = {
    width: width,
    height: height,
    margin: margin,
    svg: svg,
}

// Volcano Main
// Gross extrafunctional volcano code from abundance-volcano-305.js
if(false) {

}

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

function setupCanvas(svg, margin, width, height) {
    // Create the SVG
    svg.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create axis labels
    VolcanoUtils.create_axis_labels(svg, width, height)

    return [margin, width, height]
}

// The Volcano component
const Volcano = () => {
    const svgRef = React.useRef(null)
    //var [margin, width, height] = ninf

    React.useEffect(() => {
        const svg = d3v3.select(svgRef.current)
        svg.select('*').remove()
        setupCanvas(svg, margin, width, height)


        // Volcano SVG initialization

        // Volcano default initialization

    }, [margin, width, height]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}>
            </svg>
        </div>
    )
}

export default Volcano;