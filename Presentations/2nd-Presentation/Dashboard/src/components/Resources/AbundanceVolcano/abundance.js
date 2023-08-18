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

    React.useEffect(() => {
        //console.log('Abundance useEffect called')
        AbundanceUtils.handleChange({value: currentGene})
    }, [currentGene]);

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
            <div className="pb-2">
                <Dropdown options={genes} handleChange={AbundanceUtils.handleChange} /> {/*theCurrentGene={currentGene}/>*/}
            </div>
            

            <h3 style={headerStyle}>Your {currentGene} Gene Abundance</h3>


            <svg ref={svgRef} width={width}  height={height + v_offset}>
            </svg>

            <div className='flex'>
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

export default Abundance
