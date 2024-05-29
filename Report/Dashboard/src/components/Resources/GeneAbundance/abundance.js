import React from "react"
import * as d3v4 from './d3.v4.js';

import * as AbundanceUtils from './abundance-utils.js'
import AbundanceDropdown from './abundanceDropdown.js'

import * as utils from './utils.js'
let genes = utils.getGenesForDropdown()

const margin = {top: 15, right: 0, bottom: 45, left: 0},
width = 750 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom; 

const Abundance = ({currentGene, setCurrentGene}) => {
    // Dev
    console.log('Abundance: ' + currentGene)

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
       fontSize: '21px',
       textAlign: 'center',
       fontFamily: 'Space Grotesk'
     }

    const handleChange = (option) => {
        console.log(option)
        console.log(currentGene)

        if(!option.hasOwnProperty('value')) {
            option = {value: option}
        }

        setCurrentGene(option.value.toString())
        AbundanceUtils.handleChange(option)
    } 

    return (
        <div data-testid="geneabundance-abundance-component">
            <div className="pb-2">
                <AbundanceDropdown options={genes} setSelectedOption={handleChange} selectedOption={currentGene}/>
            </div>
            

            <h3 style={headerStyle}>Your {currentGene} Gene Abundance</h3>


            <svg ref={svgRef} width={width}  height={height}>
            </svg>

            <div className='flex'>
                <div className='flex justify-end'>
                    <p style={{fontFamily: "Space Grotesk"}} style={paragraphStyle}>
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
