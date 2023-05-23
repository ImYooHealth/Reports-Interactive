import React from "react"

import * as d3v4 from './d3.v4.js';

const Circle = ({cx, cy}) => {

    const svgRef = React.useRef(null)


    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = + 500 - margin.top - margin.bottom; 

    React.useEffect(() =>  {
        const svgEl = d3v4.select(svgRef.current)
        //svgEl.selectAll("*").remove()


        svgEl
            .append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', 40)
            .style('fill', 'red')
            .style('stroke-width', "3")
            .style('stroke', 'black')


        const measured_width = d3v4.select('.the_circle').node().getBoundingClientRect().width
        const measured_height = d3v4.select('.the_circle').node().getBoundingClientRect().height;
        console.log(measured_height)
        console.log(measured_width)

        d3v4.select('circle')
            .attr('cx', measured_width / 2)
            .attr('cy', measured_height / 2)


    })

    return (
      <div>
        <svg ref={svgRef} width={200} height={200}>
        </svg>
      </div>
        );
}

export default Circle
