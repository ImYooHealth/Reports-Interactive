import * as d3v4 from './d3.v4.js'
import * as utils from './utils.js'
let genes = utils.getGenes()
console.log(genes[0])
// State

// Abundance State
var GROUPING
var ABUNDANCE_VERTICAL
var data
var abundance_y_scale
var abundance_svg
var abundance_y_axis
var histogram
var data_groups
var abundance_x
var margin
var v_offset
var width
var height
var bins
var input
var allBins
var lengths
var longest
var svg

// Local
var abundance_path_prefix = 'http://localhost:31339/Abundances/'

// Deployed
//var abundance_path_prefix = 'https://samplereportdata.imyoo.health/Abundances/'

var currentGene
v_offset = 0
GROUPING = 'cell_type' // For demo data use: 'Species'
ABUNDANCE_VERTICAL = 'abundance_value'  // For demo data use: 'Sepal_Width'
var SELF = 'is_self'
//data = AbundanceUtils.readAbundanceData("WDR83OS")  // TODO: Cleanup when adding formal backend, and also enclose in a directory named data

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


// Begin functions section
margin = {top: 15, right: 10, bottom: 45, left: 10},
width = 1500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom; 
export function initialize(theSvg, theCurrentGene) {
    abundance_svg = theSvg
    abundance_svg.select("*").remove()
    currentGene = theCurrentGene
    initializeDataless()
    setupConstants(currentGene)
    initializeDataful()
    console.log(genes[0])
    updateAbundance(readAbundanceData(genes[0]), theCurrentGene)
}

function initializeDataless() {
    // Section 1 of 2
    // Features of the histogram
    histogram = d3v4.histogram()
      .value(d => d)


    // Section 2 of 2
    abundance_svg
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
}

function setupConstants(currentGene) {
    data = readAbundanceData(currentGene)  // TODO: Cleanup when adding formal backend, and also enclose in a directory named data

    const abundance_hvals = [...new Set(data.map((row) => row[GROUPING]))].filter((item) => typeof(item) === 'string')

    // Build and Show the X Axis. It is a band scale like for a boxplot: each group has an
    // dedicated RANGE on the axis. This range has a length of abundance_x.bandwidth
    abundance_x = d3v4.scaleBand()
      .domain(abundance_hvals)
      .range([0, width])
      .padding(0.0001)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

    // Build and Show the Y scale
    abundance_y_scale = d3v4.scaleLinear()
      .domain([0, 1])
      // .domain([0, abundance_maxv * 1.10]) // Note that here the Y scale is set manually
      .range([height, 0]);
    abundance_y_axis = d3v4.axisLeft(abundance_y_scale);
}

export function updateAxes(theData){//, ABUNDANCE_VERTICAL, abundance_svg) {
  // Vertical
  const abundance_vvals = theData.map((row) => parseFloat(row[ABUNDANCE_VERTICAL]));
  const abundance_numeric_vvals = abundance_vvals.filter((val) => !Number.isNaN(val));
  const abundance_maxv = Math.max(...abundance_numeric_vvals);

  // Update scale domain
  abundance_y_scale.domain([0, abundance_maxv * 1.10]);

  // Redraw yAxis
  yAxisGroup.selectAll('.tick').remove()
  abundance_svg.select(".y.axis")
      .transition()  // optional, for smooth transition
      .duration(250)  // transition duration in milliseconds
      .call(abundance_y_axis);

  // TODO TUNEABLE PIECE: not an actual task, but a notation of a knob. 
  histogram.domain(abundance_y_scale.domain())
    .thresholds(abundance_y_scale.ticks(20)) //  Number of Bins
}

var yAxisGroup 
function initializeDataful() {
    abundance_svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + height + ")")
        .call(d3v4.axisBottom(abundance_x))
        .attr("font-size","16px")
        .attr('font-family', "Space Grotesk")

    yAxisGroup = abundance_svg.append("g")
        .attr('transform', 'translate(' + margin.left + ",0)")
        .attr("class", "y axis")
        .call(abundance_y_axis);
    
    abundance_svg
      .attr("viewBox", `0 0 ${
        width+ margin.left + margin.right} ${height + margin.top + margin.bottom
    }`);
}

export function handleChange(option) {
    const geneName = option.value.toString()
    data = readAbundanceData(geneName)
    updateAbundance(data, geneName)
}

export function readAbundanceData(geneName) {
    console.log(`Reading data for gene ${geneName}`)
    return readCSVFile(abundance_path_prefix + geneName + '.csv')
}

export function updateAbundance(theData, geneName) {
    console.log('Update called')
    console.log(theData)

    data = theData
    updateAxes(theData)
    removeFeatures();
    addViolin(theData);
    addPoints(theData);
}

// Functions used only here
function setState(state) {
    ABUNDANCE_VERTICAL = state.ABUNDANCE_VERTICAL
    abundance_svg = state.abundance_svg
    abundance_x = state.abundance_x
    margin = state.margin
    v_offset = state.v_offset    
    abundance_y_scale = state.abundance_y_scale
    abundance_y_axis = state.abundance_y_axis
    histogram = state.histogram
    data_groups = state.data_groups
    GROUPING = state.GROUPING
}

export function removeFeatures() {

  // Remove violin
  abundance_svg.selectAll('.violin').remove()

  // Remove dots in all data groups
  for(let group in data_groups) {
    let point_class = data_groups[group]["point_class"];
    let class_selector = `\.${point_class}`;
    abundance_svg.selectAll(class_selector).remove();
  }
}

// Begin Abundance Function Definitions
// TODO: index.['likeThis'], pass field names as parameters. 
export function addViolin(theData) {
  var bins
  var input
  // Section 1 of 3: Sumstat
  // Compute the binning for each group of the dataset
  var sumstat = d3v4.nest()  // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d[GROUPING];})
    .rollup(function(d) {   // For each key..
      input = d.map(function(g) { return g[ABUNDANCE_VERTICAL];})    // Keep the variable called Sepal_Length
      bins = histogram(input)   // And compute the binning on it.
      return(bins)
    })
    .entries(theData)

  // Section 2 of 3: abundance_xNum
  // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
  var maxNum = 0
  for (let i in sumstat){
    allBins = sumstat[i].value
    lengths = allBins.map(function(a){return a.length;})
    longest = d3v4.max(lengths)
    if (longest > maxNum) { maxNum = longest }
  }

  // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
  var abundance_xNum = d3v4.scaleLinear()
    .range([0, abundance_x.bandwidth()])
    .domain([-maxNum, maxNum])

  // Section 3 of 3: Plot
  abundance_svg
    .selectAll("violin")
    .data(sumstat)
    .enter()        // So now we are working group per group
    .append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
    .append("g")
      .attr("transform", function(d){ return("translate(" + abundance_x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
    .append("path")
    .attr('class', 'violin')
        .datum(function(d){ return(d.value)})     // So now we are working bin per bin
        .style("stroke", "none")
        .style("fill","grey")
        .attr("d", d3v4.area()
            .x0(abundance_xNum(0))
            .x1(function(d){ return(abundance_xNum(d.length)) })
            .y(function(d){ return(abundance_y_scale(d.x0)) })
            .curve(d3v4.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3v4.curveStep to see the difference
        )
}


// TODO: index.['likeThis'], pass field names as parameters. 
export function addPoints(theData) {
  console.log('addPoints called')
  console.log(abundance_svg)


  //var jitterWidth = 40
  var jitterMultiplier = 2.5;

  // Separate the data into two groups - others and self. That way we can
  // make sure to add self last, putting it on top of the (seemingly
  // inaccessible) z-stack. Conveniently, we can also style it independently
  // that way.

  theData = setPointJitter(theData);

  for(let group in data_groups) {
    data_groups[group]["data"] = [];
  }

  for(let datum of theData) {
    if(datum['is_self'] == "True") {
      data_groups["self"]["data"].push(datum);
    }
    else {
      data_groups["others"]["data"].push(datum);
    }
  }

  for(let group in data_groups) {
    let data = data_groups[group]["data"];

    abundance_svg
      .selectAll(data_groups[group]["point_tag"])
      .data(data)
      .enter()
      .append('g')
        .attr('transform', 'translate(' + (margin.left - 3) + ",0)")
      .append("circle")
      .attr("class", data_groups[group]["point_class"])
      .attr("cx", function(d) {
          // console.log(d)
          let jitter = d["jitter"];
          let val = abundance_x(d[GROUPING]) + abundance_x.bandwidth() / 2 - Math.random() * jitter * jitterMultiplier;
          if (isNaN(val)) {
            console.log(d);
          }
          return val;
      })
      .attr("cy", function(d){return(abundance_y_scale(d[ABUNDANCE_VERTICAL]))})
      .attr("r", data_groups[group]["radius"])
      .style("fill", data_groups[group]["color"]
      )
      .attr("stroke", "white")
  }
}


// Begin section functions used by both
// Read the data and compute summary statistics for each species
export function readCSVFile(filePath, type) {
  const request = new XMLHttpRequest();
  request.open("GET", filePath, false);
  request.send();
  const csvData = request.responseText;
  const rows = csvData.split("\n");
  const headerRow = rows[0].split(",");
  var dataRows = rows.slice(1);
  // Remove empty rows at the end that trigger nans
  if (dataRows.slice(-1).length < headerRow.length) {
    dataRows = dataRows.slice(0, -1);
  }
  const result = [];
  for (let i = 0; i < dataRows.length; i++) {
    const dataRow = dataRows[i].split(",");
    const obj = {};
    for (let j = 0; j < headerRow.length; j++) {
      obj[headerRow[j]] = dataRow[j];
    }
    result.push(obj);
  }
  return result;
}
// End section functions used by both

export function respondToSelection(event) {
    var theData = readCSVFile(event.target.value)
    updateAbundance(theData, "")
}

export function setPointJitter(theData) {
  var bins

  var sumstat = d3v4.nest()  // nest function allows to group the calculation per level of a factor
  .key(function(d) { return d[GROUPING];})
  .rollup(function(d) {   // For each key..
    input = d.map(function(g) { return g[ABUNDANCE_VERTICAL];})    // Keep the variable called Sepal_Length
    bins = histogram(input)   // And compute the binning on it.
    return(bins)
  })
  .entries(theData)

  // Section 2 of 3: abundance_xNum
  // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
  var maxNum = 0
  for ( i in sumstat ){
    allBins = sumstat[i].value
    lengths = allBins.map(function(a){return a.length;})
    longest = d3v4.max(lengths)
    if (longest > maxNum) { maxNum = longest }
  }

  // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
  var abundance_xNum = d3v4.scaleLinear()
    .range([0, abundance_x.bandwidth()])
    .domain([-maxNum, maxNum])

  for(let datum of theData) {
    
    let group = datum[GROUPING];
    let groupstat = null;

    for(var i in sumstat) {
      if(sumstat[i]["key"] == group) {
        groupstat = sumstat[i]["key"];
        break;
      }
    }

    if(groupstat == null) {
      alert("Error matching group statistic with group in data");
      console.log("baaaad");
      return null;
    }

    for(let bin of sumstat[i]["value"]) {

      datum.jitter = bin.length;

      if(
        datum[ABUNDANCE_VERTICAL] >= bin.x0 &&
        datum[ABUNDANCE_VERTICAL] < bin.x1) {
          break;
      }
    }
  }

  return theData;
}
// End Abundance function definitions
