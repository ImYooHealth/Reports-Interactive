import React from "react"
import d3v3 from './d3.v3.js'

import * as utils from './utils.js'
import * as VolcanoUtils from './volcanoUtils.js'
import Dropdown from './dropdown.js'

let genes = utils.getGenes()
let cellTypes = utils.cellTypes

// The Volcano component
const Volcano = ({changeAbundanceGene}) => {
    const svgRef = React.useRef(null)
    const [cellTypeName, setCellTypeName] = React.useState(cellTypes[0].value)  // Initial Value

    React.useEffect(() => {
        const svg = d3v3.select(svgRef.current)
        VolcanoUtils.initialize(svg, changeAbundanceGene)
//        changeAbundanceGene(genes[0])  // For no known reason
        changeAbundanceGene(genes[1])    // Abundance refuses to initialize with genes[0]
//        changeAbundanceGene(genes[2])  // Adding indices induced the change
    }, []);                              // Why it works as shown is a matter yet to be explained by rational inquiry. 

    React.useEffect(() => {
        VolcanoUtils.updateVolcano(cellTypeName)
    }, [cellTypeName]);

    const paragraphStyle = {
        fontSize: '12px',
        textAlign: 'left',
        fontFamily: 'Space Grotesk'
    }

    return (
        <div id='volcano'>
            <div style={{padding: '20px'}}>
                <Dropdown options={cellTypes} handleChange={VolcanoUtils.handleChange}/>
            </div>
            <svg ref={svgRef}>
            </svg>

            <div className='flex space-x-4' style={{paddingTop: '20px'}}>
                <div className='flex justify-end'>
                    <p style={paragraphStyle}>
                        * Wald statistic of differential expression over reference database using DEseq2
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Volcano;
