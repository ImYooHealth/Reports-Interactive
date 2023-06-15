import React from "react"
import * as d3v4 from './d3.v4.js';

import * as AbundanceUtils from './abundance-utils.js'
import Dropdown from './dropdown.js'
import genes from '../Data/geneList1000.js'

const margin = {top: 15, right: 10, bottom: 45, left: 10},
width = 900 - margin.left - margin.right,
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

    return (
        <div>
            <Dropdown options={genes} handleChange={AbundanceUtils.handleChange}/>
            <svg ref={svgRef} width={width}  height={height + v_offset}>
            </svg>

            <div className='flex space-x-4'>
                <Dropdown options={genes} handleChange={AbundanceUtils.handleChange}/>             
            </div>
        </div>
    );
}

export default Abundance