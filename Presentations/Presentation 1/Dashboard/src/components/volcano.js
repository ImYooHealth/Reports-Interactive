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

    return (
        <div id='volcano'>
            <svg ref={svgRef} width={width} height={height}>
            </svg>

            <div className='flex space-x-4'>
                <Dropdown options={cellTypes} handleChange={VolcanoUtils.handleChange}/>
                <p style={{ textAlign: 'right', fontSize: '14px'}}>
                    Horizontal Left: Less Expression; Horizontal 
                    Right: More Expression; Vertical: Signal 
                    Strength.
                </p>
            </div>            
        </div>
    )
}

export default Volcano;