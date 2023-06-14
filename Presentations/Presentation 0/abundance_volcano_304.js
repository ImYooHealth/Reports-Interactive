const real_data = true

var GROUPING
var ABUNDANCE_VERTICAL
var SELF
var data

if (real_data) {
    GROUPING = 'cell_type' // For demo data use: 'Species'
    ABUNDANCE_VERTICAL = 'abundance_value'  // For demo data use: 'Sepal_Width'
    SELF = 'is_self'
    data = readCSVFile("304/Abundances/COMT.csv")
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
/*
// Color scale for dots
var myColor = d3v4.scaleSequential()
  .interpolator(d3v4.interpolateInferno)
  .domain([3,9])
*/
// Hereafter, everything depends on data

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
  .range([height, 0]);

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

//-----------

const VOLCANO_HORIZONTAL = 'log2FoldChange'
const VOLCANO_VERTICAL = 'magstat'


// Hereafter, js is essentially main()

/* Begin canvas setup */

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Create the SVG
var svg = d3v3.select("#volcano_plot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create axis labels
create_axis_labels(svg, width, height)
/* End canvas setup */

svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

/* Hereafter, things depend on data */
/* TODO: initialize from new data */
var data = readCSVFile("data/304/Volcanoes/B Cells.csv");

// Data prep: we wish only to use |stat|
// No data prep. That should happen in data generation. 
//data.magstat = data.map((row) => Math.abs(parseFloat(row[VOLCANO_VERTICAL])))
//console.log(data);

/* Begin Setup axes and brush */
// Find ranges for axes
// Horizontal
const hvals = data.map((row) => parseFloat(row[VOLCANO_HORIZONTAL]));
const numeric_hvals = hvals.filter((val) => !Number.isNaN(val));
const minh = Math.min(...numeric_hvals);
const maxh = Math.max(...numeric_hvals);
const maxx = Math.max(...[-minh, maxh]) * 1.10;

// Vertical
const vvals = data.map((row) => Math.abs(parseFloat(row[VOLCANO_VERTICAL])));
const numeric_vvals = vvals.filter((val) => !Number.isNaN(val));
const maxv = Math.max(...numeric_vvals) * 1.10;

var volcano_x = d3v3.scale.linear()
    .domain([-maxx, maxx])
    .range([0, width]);

var volcano_y = d3v3.scale.linear()
    .domain([0, maxv])
    .range([height, 0]);

var brush = d3v3.svg.brush()
    .x(volcano_x)
    .y(volcano_y)
    .on("brush", brushmove)
    .on("brushend", brushend);

var volcano_xAxis = d3v3.svg.axis()
    .scale(volcano_x)
    .orient("bottom");

var volcano_yAxis = d3v3.svg.axis()
    .scale(volcano_y)
    .orient("left")
    .ticks(8);  // TODO: Replace with arrow

svg.append("g")
    .attr("class", "volcano_x axis")
    .attr("clip-path", "url(#clip)")
    .attr("transform", "translate(0," + height + ")")
    .call(volcano_xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(volcano_yAxis);

svg.append("g")
    .attr("class", "brush")
    .call(brush)
      .selectAll('rect')
      .attr('height', height);
/* End setup axes and brush */


/*---------- begin points object region --------*/

points = svg.selectAll(".volcano_point")
    .data(data)
    .enter().append("circle")
    .attr("class", "volcano_point")
    .attr("clip-path", "url(#clip)")
    .attr("r", 8)
    .attr("cx", function(d) { return volcano_x(d[VOLCANO_HORIZONTAL]); })
    .attr("cy", function(d) { return volcano_y(Math.abs(d[VOLCANO_VERTICAL])); })
    .call(d3v3.helper.tooltip());

// TODO: Make update take either a string or an event, and use only it to create points
const volcano_selector = document.querySelector('.volcano_dropdown_class')
volcano_selector.addEventListener("change", updateVolcano)

// Initialize
var data = updateVolcano({target: {value: "304/Volcanoes/B Cells.csv"}})