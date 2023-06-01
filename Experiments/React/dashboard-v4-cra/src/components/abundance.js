import React from "react"

import * as d3v4 from './d3.v4.js';

//import * as abundance from './abundance_main.js'
import * as utils from './utils.js'
import Dropdown from './dropdown.jsx'

// -- vvv Abundance Functions vvv -- //


// -- ^^^ Abundance Functions ^^^ -- //

// -- vvv Abundance Main vvv -- //

var GROUPING
var ABUNDANCE_VERTICAL
var SELF
var data
var abundance_path_prefix = 'http://localhost:8000/Experiments/React/dashboard-v4-cra/src/'
var abundance_data_path_prefix = abundance_path_prefix + 'Data/'



GROUPING = 'cell_type' // For demo data use: 'Species'
ABUNDANCE_VERTICAL = 'abundance_value'  // For demo data use: 'Sepal_Width'
SELF = 'is_self'
data = utils.readCSVFile(abundance_data_path_prefix + "304/Abundances/COMT.csv")  // TODO: Cleanup when adding formal backend, and also enclose in a directory named data
var gene_names = utils.readCSVFile(abundance_data_path_prefix + 'gene_list.csv')
    .map(u => u['gene_name'])
console.log(gene_names)

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

const margin = {top: 10, right: 30, bottom: 30, left: 25},
width = 960 - margin.left - margin.right,
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
  .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

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
//    abundance_svg: abundance_svg,  // Set once svgEl exists
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


    React.useEffect(() => {
        const svgEl = d3v4.select(svgRef.current)
        svgEl.select("*").remove()

        svgEl
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

        svgEl.append("g")
          .attr("transform", "translate(" + margin.left + "," + height + ")")
          .call(d3v4.axisBottom(abundance_x))

        svgEl.append("g")
          .attr('transform', 'translate(' + margin.left + ",0)")
          .attr("class", "y axis")
          .call(abundance_y_axis);

        // This should be the last line
        state.abundance_svg = svgEl
        utils.updateAbundance(data, state, svgEl)  

    }, [data, state, abundance_x, abundance_y_axis]);

    return (
        <div>
            <svg ref={svgRef} width={width}  height={height + v_offset}>
            </svg>
            <Dropdown options={gene_names} />
        </div>
    );
}

export default Abundance