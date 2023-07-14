import React from "react"
import * as d3v4 from './d3.v4.js';

import * as AbundanceUtils from './abundance-utils.js'
import Dropdown from './dropdown.js'
//import genes from '../Data/geneList.js'
let genes = {}

const margin = {top: 15, right: 30, bottom: 45, left: 50},
width = 1500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom; 

// Offsets to ensure non-overlap
let v_offset = 0

const Abundance = ({currentGene}) => {
    const svgRef = React.useRef(null)
    const svg = d3v4.select(svgRef.current)
    AbundanceUtils.initialize(svg, currentGene)

    React.useEffect(() => {
        console.log('Abundance useEffect called')
        AbundanceUtils.handleChange({value: currentGene})
    }, [currentGene]);

    const paragraphStyle = {
      fontSize: '12px',
      textAlign: 'right',
      fontFamily: 'Space Grotesk'
    }

    return (
        <div>
            <p>{currentGene}</p> 
            <div style={{padding: '20px'}}>
                <Dropdown options={genes} handleChange={AbundanceUtils.handleChange} theCurrentGene={currentGene}/>
            </div>
            
            <svg ref={svgRef} width={width}  height={height + v_offset}>
            </svg>

            <div className='flex space-x-4' style={{paddingTop: '20px'}}>
                <div className='flex justify-end'>
                    <p style={paragraphStyle}>
                        * Units of Transcripts per Million (TPM): number
                        of transcripts of this gene counted per
                        million transcripts counted.
                    </p>
                </div>                
            </div>
        </div>
    );
}
export function create_axis_labels(svg, width, height) {

  let font_family = 'Space Grotesk';

  // Vertical axis label
  svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("y", 0)
      .attr("x", -(height / 2))
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Gene Abundance*")
      .attr("font-size","14px")
      .attr('font-family', font_family)
}

export default Abundance

// David, see line 34 <p> to set gene name.