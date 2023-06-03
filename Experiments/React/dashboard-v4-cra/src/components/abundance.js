import React from "react"
import Select from 'react-select'


import * as d3v4 from './d3.v4.js';

//import * as abundance from './abundance_main.js'
import * as utils from './utils.js'
//import Dropdown_limit_scroll from './dropdown_limit_scroll.jsx'
//import DropdownAutocomplete from './dropdown_autocomplete'
import Dropdown from './dropdown.js'

// -- vvv Abundance Functions vvv -- //

// Moved to utils.js

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
data = utils.readAbundanceData("WDR83OS")  // TODO: Cleanup when adding formal backend, and also enclose in a directory named data

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



const margin = {top: 15, right: 10, bottom: 45, left: 10},
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

                console.log(abundance_x)

        svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + height + ")")
          .call(d3v4.axisBottom(abundance_x))
          .attr("font-size","16px")
          .attr('font-family', "Arial")

        svg.append("g")
          .attr('transform', 'translate(' + margin.left + ",0)")
          .attr("class", "y axis")
          .call(abundance_y_axis);   
        /*
        // Vertical axis label
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("y", 0)
            .attr("x", -(height / 2))
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Counts Per Million")
            .attr("font-size","18px")
            .attr('font-family', "Arial")
        */
        // Axis Labels
        let v_axis_label_adjust = 0
        let h_axis_label_adjust = 50
        let font_family = 'Arial'

        svg.append("text")
            .attr('class', 'x label right')
            .attr('text-anchor', 'Begin')
            .attr('x', 225)
            .attr('y', height + h_axis_label_adjust)
            .text('Units of Counts per Million: literal number of transcripts of this gene counted per million transcripts counted.')
            .attr('font-size', '14px')
            .attr('font-family', font_family)    

        svg
          .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);



        // This should be the last line
        state.abundance_svg = svg
        utils.updateAbundance(data, state, svg)

    }, [data, state, abundance_x, abundance_y_axis]);

    return (
        <div>
            <svg ref={svgRef} width={width}  height={height + v_offset}>
            </svg>

            <div className='flex space-x-4'>
                <Dropdown />
            </div>
        </div>
    );
}

export default Abundance