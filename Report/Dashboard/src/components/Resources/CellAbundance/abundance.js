import React from "react"
import * as d3v4 from './d3.v4.js';

import * as AbundanceUtils from './abundance-utils.js'
import Dropdown from './dropdown.js'

import * as utils from './utils.js'
let genes = utils.getGenesForDropdown()

const margin = {top: 15, right: 0, bottom: 45, left: 0},
width = 800 - margin.left - margin.right,
height = 420 - margin.top - margin.bottom; 

// Offsets to ensure non-overlap
let v_offset = 0

const Abundance = ({currentGene}) => {
    const svgRef = React.useRef(null)
    const svg = d3v4.select(svgRef.current)
    AbundanceUtils.initialize(svg, currentGene)
/*
    React.useEffect(() => {
        AbundanceUtils.handleChange({value: currentGene})
    }, [currentGene]);
*/
    const paragraphStyle = {
      fontSize: '12px',
      textAlign: 'right',
      fontFamily: 'Space Grotesk'
    }

    const headerStyle = {
       fontSize: '24px',
       textAlign: 'center',
       fontFamily: 'Space Grotesk'
     }

    return (
        <div>
            <div>        
                <h3 className="pb-1" style={headerStyle}>Your Immune Army</h3>
            </div>
            
            <p style={{fontFamily: "Space Grotesk"}} className="text-base pb-4">
            These are your immune cells, broken down by type. You can see how much each type contributes to the population of your immune army as a whole, and see how yours compare to the broader population of fellow participants.
            </p>

            <svg ref={svgRef} width={width}  height={height + v_offset}></svg>

            <div >
                <div className='flex items-center justify-center'>
                
                    <p style={{fontFamily: "Space Grotesk"}} className="pb-1" style={{fontSize: '20px', fontFamily: 'Space Grotesk'}}>Your Immune Cells By Type</p>

                </div>                
            </div>
        </div>
    );
}

export default Abundance
