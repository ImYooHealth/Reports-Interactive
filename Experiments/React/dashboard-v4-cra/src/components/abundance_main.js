import * as utils from './utils.js'

const real_data = true

var GROUPING
var ABUNDANCE_VERTICAL
var SELF
var data

if (real_data) {
    GROUPING = 'cell_type' // For demo data use: 'Species'
    ABUNDANCE_VERTICAL = 'abundance_value'  // For demo data use: 'Sepal_Width'
    SELF = 'is_self'
    data = utils.readCSVFile("304/Abundances/COMT.csv")
    console.log(data)
    
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
} else {
    GROUPING = 'Species'
    ABUNDANCE_VERTICAL = 'Sepal_Width'
    SELF = 'is_self'
    data = readCSVFile("data1.csv")
}


// Add response
const abundance_selector = document.querySelector('.abundance_dropdown_class')
abundance_selector.addEventListener("change", respondToSelection)

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the abundance_svg object to the body of the page
var abundance_svg = d3v4.select("#abundance_plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Color scale for dots
var myColor = d3v4.scaleSequential()
  .interpolator(d3v4.interpolateInferno)
  .domain([3,9])

// Hereafter, everything depends on data
// data = readCSVFile("304/Abundances/COMT.csv")

// Begin setup
// Find ranges for axes
// Horizontal
const abundance_hvals = [...new Set(data.map((row) => row[GROUPING]))].filter((item) => typeof(item) === 'string')


// Build and Show the X scale. It is a band scale like for a boxplot: each group has an
// dedicated RANGE on the axis. This range has a length of abundance_x.bandwidth
var abundance_x = d3v4.scaleBand()
  .domain(abundance_hvals)
  .range([0, width])
  .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

abundance_svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3v4.axisBottom(abundance_x))


// Build and Show the Y scale
var abundance_y_scale = d3v4.scaleLinear()
  .domain([0, 1])
  // .domain([0, abundance_maxv * 1.10]) // Note that here the Y scale is set manually
  .range([v_adjust + height, v_adjust]);

var abundance_y_axis = d3v4.axisLeft(abundance_y_scale);

abundance_svg.append("g")
  .attr("class", "y axis")
  .call(abundance_y_axis);

// Features of the histogram
var histogram = d3v4.histogram()
  .value(d => d)
// End setup


// Initialize
updateAbundance(data)