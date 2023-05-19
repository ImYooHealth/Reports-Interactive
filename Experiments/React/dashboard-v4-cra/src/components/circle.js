import React from "react"

import * as d3v4 from './d3.v4.js';

const Circle = () => {
    console.log('foobar')
    console.log(Object.keys(d3v4))
    console.log('selectAll' in d3v4)
    const svgRef = React.useRef(null)

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = + 500 - margin.top - margin.bottom; 

    React.useEffect(() =>  {
        const svgEl = d3v4.select(svgRef.current)
        svgEl.selectAll("*").remove()

        //const svg = svgEl
        //    .append('g')
        //    .attr('transform', `translate(${margin.left},${margin.right})`)

        svgEl
            .append('svg')
            .attr('width', margin.left + width  + margin.right)
            .attr('height', margin.top + height + margin.bottom)
            .append('g')
                .attr('transform',
                      'translate(' + margin.left + ',' + margin.top + ')')

        svgEl
            .append('circle')
            .attr('cx', 20)
            .attr('cy', 20)
            .attr('r', 10)
            .style('fill', 'red')
            .style('stroke-width', "3")
            .style('stroke', 'black')

    })

    return (
      <div>
        <svg ref={svgRef} width={200} height={200}>
            {/* The circle will be drawn within this SVG */}
        </svg>
      </div>
        );
}

export default Circle
