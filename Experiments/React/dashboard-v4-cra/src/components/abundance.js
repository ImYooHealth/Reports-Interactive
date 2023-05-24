import React from "react"

import * as d3v4 from './d3.v4.js';
import * as abundance from './abundance_main.js'



const Abundance = () => {
    const svgRef = React.useRef(null)
    const real_data = true

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = + 500 - margin.top - margin.bottom; 

    React.useEffect(() => {
        const svgEl = d3v4.select(svgRef.current)

        svgEl
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
    });

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
}

export default Abundance