import React from "react"
import d3v3 from './d3.v3.js'

import * as utils from './utils.js'
import * as VolcanoUtils from './volcanoUtils.js'
import Dropdown from './dropdown.js'
import cellTypes from './../Data/cellTypesList.js'

// State
var width, height, margin, svg
var state = {
    svg: svg,
}

// Volcano Main
// Gross extrafunctional volcano code from abundance-volcano-305.js
if(false) {

}

// The Volcano component
const Volcano = () => {
    const svgRef = React.useRef(null)
    const [cellTypeName, setCellTypeName] = React.useState('T Cells')  // Initial Value
    //var [margin, width, height] = ninf

    React.useEffect(() => {
        const svg = d3v3.select(svgRef.current)
        VolcanoUtils.initialize(svg)

    }, []);

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
            <svg ref={svgRef} width={width} height={height}>
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