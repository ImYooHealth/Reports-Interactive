import React from "react"
import * as d3v4 from './d3.v4.js';

import * as AbundanceUtils from './abundance-utils.js'
import Dropdown from './dropdown.js'
import genes from '../Data/geneList.js'

// -- vvv Abundance Functions vvv -- //

// Moved to AbundanceUtilsjs

// -- ^^^ Abundance Functions ^^^ -- //

// -- vvv Abundance Main vvv -- //

var GROUPING
var ABUNDANCE_VERTICAL
var SELF
var data
var abundance_path_prefix = 'http://localhost:8000/Dashboard/src/'
var abundance_data_path_prefix = abundance_path_prefix + 'Data/'

GROUPING = 'cell_type' // For demo data use: 'Species'
ABUNDANCE_VERTICAL = 'abundance_value'  // For demo data use: 'Sepal_Width'
SELF = 'is_self'
console.log(genes);
data = AbundanceUtils.readAbundanceData(genes[0].value)  // TODO: Cleanup when adding formal backend, and also enclose in a directory named data

var data_groups = {
  "others": {
    "data": [],
    "point_tag": "other_abundance_points",
    "point_class": "other_abundance_point",
    "color": "#C0CCDC",
    "radius": 3
  },
  "self": {
    "data": [],
    "point_tag": "self_abundance_points",
    "point_class": "self_abundance_point",
    "color": "#D73737",
    "radius": 7
  }
};

/* Temporarily Disabled */
// Add response
//const abundance_selector = document.querySelector('.abundance_dropdown_class')
//abundance_selector.addEventListener("change", respondToSelection)



const margin = {top: 15, right: 30, bottom: 45, left: 50},
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom; 

// Offsets to ensure non-overlap
let v_offset = 20

/* Not actually used now. An artifact from when the dots had a spectrum to them. 
// Perhaps: spectrum, or white for self.
// Color scale for dots
var myColor = d3v4.scaleSequential()
  .interpolator(d3v4.interpolateInferno)
  .domain([3,9])
*/

// Begin setup
// Find ranges for axes
// Horizontal
const abundance_hvals = [...new Set(data.map((row) => row[GROUPING]))].filter((item) => typeof(item) === 'string')

// Build and Show the X Axis. It is a band scale like for a boxplot: each group has an
// dedicated RANGE on the axis. This range has a length of abundance_x.bandwidth
var abundance_x = d3v4.scaleBand()
  .domain(abundance_hvals)
  .range([0, width])
  .padding(0.0001)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

// Build and Show the Y scale
var abundance_y_scale = d3v4.scaleLinear()
  .domain([0, 1])
  // .domain([0, abundance_maxv * 1.10]) // Note that here the Y scale is set manually
  .range([height, 0]);
var abundance_y_axis = d3v4.axisLeft(abundance_y_scale);

// Features of the histogram
var histogram = d3v4.histogram()
  .value(d => d)
// End setup

// Bundle state
var state = {
    GROUPING: GROUPING,
    ABUNDANCE_VERTICAL: ABUNDANCE_VERTICAL,
    abundance_y_scale: abundance_y_scale,
    abundance_y_axis: abundance_y_axis,
    histogram: histogram,
    data_groups: data_groups,
    abundance_x: abundance_x,
    margin: margin,
    width: width,
    height: height,
    v_offset: v_offset,
}


const Abundance = () => {
    const svgRef = React.useRef(null)
    const items = ['Option 1', 'Option 2', 'Option 333333333'];
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]

    React.useEffect(() => {
        const svg = d3v4.select(svgRef.current)
        svg.select("*").remove()

        svg
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + (height) + ")")
          .call(d3v4.axisBottom(abundance_x))
          .attr("font-size","16px")
          .attr('font-family', "Space Grotesk")

        svg.append("g")
          .attr('transform', 'translate(' + margin.left + ",0)")
          .attr("class", "y axis")
          .call(abundance_y_axis);
        
        svg
          .attr("viewBox", `0 0 ${
            width+ margin.left + margin.right} ${height + margin.top + margin.bottom
        }`);

        // Create axis labels
        create_axis_labels(svg, width, height)

        // This should be the last line
        state.abundance_svg = svg
        AbundanceUtils.updateAbundance(data, state, svg)

    }, [data, state, abundance_x, abundance_y_axis]);


    const paragraphStyle = {
        fontSize: '12px',
        textAlign: 'right',
        fontFamily: 'Space Grotesk'
    }

    return (
        <div>
            <div style={{padding: '20px'}}>
                <Dropdown options={genes} handleChange={AbundanceUtils.handleChange}/>
            </div>
            
            <svg ref={svgRef} width={width}  height={height + v_offset}>
            </svg>

            <div className='flex space-x-4' style={{paddingTop: '20px'}}>
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
export function create_axis_labels(svg, width, height) {

  let font_family = 'Space Grotesk';

  // Vertical axis label
  svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("y", 0)
      .attr("x", -(height / 2))
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Gene Abundance*")
      .attr("font-size","14px")
      .attr('font-family', font_family)
}

export default Abundance