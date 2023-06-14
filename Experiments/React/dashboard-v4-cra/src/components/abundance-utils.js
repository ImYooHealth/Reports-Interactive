import * as d3v4 from './d3.v4.js'

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

// var const or let missing and that's unexamined
var bins

// var const or let missing and that's fine
var input
var allBins
var lengths
var longest

var abundance_path_prefix = 'http://localhost:8000/Experiments/React/dashboard-v4-cra/src/Data/__secrets__00/Abundances/'


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

export function handleChange(option) {
    const geneName = option.value
    console.log(geneName)
    data = readAbundanceData(geneName)
    console.log(data)
    updateAbundance(data)
}

export function readAbundanceData(geneName) {
    return readCSVFile(abundance_path_prefix + geneName + '.csv')
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
    updateAbundance(theData)
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

// TODO: index.['likeThis'], pass field names as parameters. 
export function addPoints(theData) {

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
      .attr("cy", function(d){return(abundance_y_scale(d[ABUNDANCE_VERTICAL]) + v_offset)})
      .attr("r", data_groups[group]["radius"])
      .style("fill", data_groups[group]["color"]
      )
      .attr("stroke", "white")
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

export function updateAxes(theData){//, ABUNDANCE_VERTICAL, abundance_svg) {

  // Vertical
  const abundance_vvals = theData.map((row) => parseFloat(row[ABUNDANCE_VERTICAL]));
  const abundance_numeric_vvals = abundance_vvals.filter((val) => !Number.isNaN(val));
  const abundance_maxv = Math.max(...abundance_numeric_vvals);

  // Update scale domain
  abundance_y_scale.domain([0, abundance_maxv * 1.10]);

  // Redraw yAxis
  abundance_svg.select(".y.axis")
      .transition()  // optional, for smooth transition
      // .duration(1000)  // transition duration in milliseconds
      .call(abundance_y_axis);

  histogram.domain(abundance_y_scale.domain())
    .thresholds(abundance_y_scale.ticks(20)) //  Number of Bins
}

export function updateAbundance(theData, state, abundance_svg) {
  if(state !== undefined) {
    setState(state)    
  }

  updateAxes(theData)//, ABUNDANCE_VERTICAL, abundance_svg);
  removeFeatures();
  addViolin(theData)
  console.log(theData)
  addPoints(theData)
}
// End Abundance function definitions
