import React from "react"
import d3v3 from './d3.v3.js'

import * as utils from './utils.js'
import * as VolcanoUtils from './volcanoUtils.js'
import Dropdown from './dropdown.js'

// The Volcano component
const Volcano = ({changeAbundanceGene}) => {
    const svgRef = React.useRef(null)
    const [genes, setGenes] = React.useState(null)
    const [cellTypes, setCellTypes] = React.useState(null)
    const [cellTypeName, setCellTypeName] = React.useState(null)
    const [initialized, setInitialized] = React.useState(false)

    // Load genes and cell types on mount
    React.useEffect(() => {
        try {
            // Note: CellAbundance volcano is hidden - we only need cell types
            // Don't load genes to avoid unnecessary data loading
            const loadedCellTypes = utils.cellTypes
            setGenes([])  // Empty array since we don't need genes
            setCellTypes(loadedCellTypes)
            setCellTypeName(loadedCellTypes[0].value)
        } catch (err) {
            console.error('Failed to load volcano data:', err)
        }
    }, [])

    React.useEffect(() => {
        if (svgRef.current && !initialized && genes && cellTypes) {
            const svg = d3v3.select(svgRef.current)
            VolcanoUtils.initialize(svg, changeAbundanceGene)
//            changeAbundanceGene(genes[0])  // For no known reason
            changeAbundanceGene(genes[1])    // Abundance refuses to initialize with genes[0]
//            changeAbundanceGene(genes[2])  // Adding indices induced the change
            setInitialized(true)
        }
    }, [genes, cellTypes]);                              // Why it works as shown is a matter yet to be explained by rational inquiry. 

    React.useEffect(() => {
        if (cellTypeName && initialized) {
            VolcanoUtils.updateVolcano(cellTypeName)
        }
    }, [cellTypeName, initialized]);

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

    if (!cellTypes || !genes) {
        return <div>Loading...</div>
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
