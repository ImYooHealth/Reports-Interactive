import React, { useEffect, useState } from "react"

import * as utils from './utils.js'
import * as VolcanoUtils from './volcanoUtils.js'
import Dropdown from './dropdown.js'

let genes = utils.getGenes()
let cellTypes = utils.cellTypes

// The Volcano component
const Volcano = ({changeAbundanceGene}) => {
    const [d3, setD3] = useState(null);
    const svgRef = React.useRef(null)
    const [cellTypeName, setCellTypeName] = React.useState(cellTypes[0].value)  // Initial Value

    useEffect(() => {
        let d3Promise;

        if (process.env.NODE_ENV === 'test') {
            return;
        } else if (typeof window !== 'undefined') {
            d3Promise = import('./d3.v3.js')
        }

        d3Promise
            .then(d3Module => {
                setD3(d3Module.default || d3Module);
            })
            .catch(error => console.error('Failed to load d3:', error));
    }, []);

    useEffect(() => {
        if (!d3) return;

        const svg = d3.select(svgRef.current)
        VolcanoUtils.initialize(d3, svg, changeAbundanceGene)
//        changeAbundanceGene(genes[0])  // For no known reason
        changeAbundanceGene(genes[1])    // Abundance refuses to initialize with genes[0]
//        changeAbundanceGene(genes[2])  // Adding indices induced the change
    }, [d3]);                              // Why it works as shown is a matter yet to be explained by rational inquiry. 

    useEffect(() => {
        if (!d3) return;
        VolcanoUtils.updateVolcano(cellTypeName)
    }, [cellTypeName, d3]);

    const paragraphStyle = {
        fontSize: '12px',
        textAlign: 'left',
        fontFamily: 'Space Grotesk'
    }

    const headerStyle = {
       fontSize: '24px',
       textAlign: 'center',
       fontFamily: 'Space Grotesk'
    }

    return (
        <div id='volcano'>
            <div style={{padding: '20px'}}>
                <Dropdown options={cellTypes} handleChange={VolcanoUtils.handleChange}/>
            </div>
            <h3 style={headerStyle}>Your {cellTypeName}' Signature</h3>


            <svg ref={svgRef}>
            </svg>

            <div className='flex space-x-4' style={{paddingTop: '20px'}}>
                <div className='flex justify-end'>
                    <p style={{fontFamily: "Space Grotesk"}} style={paragraphStyle}>
                        * Wald statistic of differential expression over reference database using DEseq2
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Volcano;
