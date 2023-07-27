import React from "react"
import d3v3 from './d3.v3.js'

import * as utils from './utils.js'
import * as VolcanoUtils from './volcanoUtils.js'
import Dropdown from './dropdown.js'

var cellTypes = [
    {
        'value': 'Monocytes',
        'label': 'Monocytes'
    },
    {
        'value': 'B Cells',
        'label': 'B Cells'
    },
    {
        'value': 'NK Cells',
        'label': 'NK Cells'
    },
    {
        'value': 'T Cells',
        'label': 'T Cells'
    },
];
import genes from '../Data/geneList.js'

// The Volcano component
const Volcano = ({changeAbundanceGene}) => {
    const svgRef = React.useRef(null)
    const [cellTypeName, setCellTypeName] = React.useState(cellTypes[0].value)  // Initial Value

    React.useEffect(() => {
        const svg = d3v3.select(svgRef.current)
        VolcanoUtils.initialize(svg, changeAbundanceGene)
        changeAbundanceGene(genes[0].value)
    }, []);

    React.useEffect(() => {
        VolcanoUtils.updateVolcano(cellTypeName)
    }, [cellTypeName]);

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
            <div style={{padding: '10px'}}>
                <Dropdown options={cellTypes} handleChange={(selectedOption) => {
                    setCellTypeName(selectedOption.value);
                    VolcanoUtils.handleChange(selectedOption);
                }}/>
            </div>

            <div style={{padding: '20px'}}>
                <h3 style={headerStyle}>Your {cellTypeName}' Signature</h3>
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