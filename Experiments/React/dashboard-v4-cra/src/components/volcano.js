import React from "react"
import * as d3v3 from './d3.v3.js';

import * as utils from './utils.js'
import Dropdown from './dropdown.js'


// Setup code



// The Volcano component
const Volcano = () => {
    const svgRef = React.useRef(null)

    react.useEffect(() => {
        const svg = d3v3.select(svgRef.current)
        svg.select('*').remove()

        
    });
}