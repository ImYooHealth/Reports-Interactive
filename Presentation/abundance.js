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
} else {
    GROUPING = 'Species'
    ABUNDANCE_VERTICAL = 'Sepal_Width'
    SELF = 'is_self'
    data = readCSVFile("data1.csv")
}

// Function definitions
// Read the data and compute summary statistics for each species
function readCSVFile(filePath) {
  const request = new XMLHttpRequest();
  request.open("GET", filePath, false);
  request.send();
  const csvData = request.responseText;
  const rows = csvData.split("\n");
  const headerRow = rows[0].split(",");
  const dataRows = rows.slice(1);
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

// TODO: index.['likeThis'], pass field names as parameters. 
function addViolin(theData) {
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

  // Section 3 of 3: Plot
  abundance_svg
    .selectAll("violin")
    .data(sumstat)
    .enter()        // So now we are working group per group
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
            .y(function(d){ return(abundance_y(d.x0)) })
            .curve(d3v4.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3v4.curveStep to see the difference
        )
}

// TODO: index.['likeThis'], pass field names as parameters. 
function addPoints(theData) {
    // Dev 
    console.log(theData)
  var jitterWidth = 40
  abundance_svg
    .selectAll("abundance_points")
    .data(theData)
    .enter()
    .append("circle")
    .attr("class", "abundance_point")
    .attr("cx", function(d) {
        console.log(d)
        return(abundance_x(d[GROUPING]) + abundance_x.bandwidth() / 2 - Math.random() * jitterWidth)
    })
    .attr("cy", function(d){return(abundance_y(d[ABUNDANCE_VERTICAL]))})
    .attr("r", 5)
    .style("fill", function(d){
            let retval = d[SELF] == 'false' ? 'orange' : 'blue'; 
            if(d[SELF]) {
                //console.log(d[SELF]); 
                //console.log(retval)
            }
            return retval
        }
    )
    .attr("stroke", "white")
}

function updateAbundance(theData) {
  //removeFeatures()

  addViolin(theData)
  addPoints(theData)
}

function removeFeatures() { 
  // Remove violin
  abundance_svg.selectAll('.violin').remove()

  // Remove dots
  abundance_svg.selectAll('.abundance_point').remove()
}

function respondToSelection(event) {
    removeFeatures()
    console.log(event.target.value)
    var theData = readCSVFile(event.target.value)
    console.log(event.target.value)
    updateAbundance(theData)
}
// End function definitions

// Add response
const abundance_selector = document.querySelector('.abundance_dropdown_class')
abundance_selector.addEventListener("change", respondToSelection)

// Prepare to shift abundance down
const v_adjust = 0//200

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = v_adjust + 400 - margin.top - margin.bottom;

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
//data = readCSVFile("304/Abundances/COMT.csv")

// Begin setup
// Find ranges for axes
// Horizontal
const abundance_hvals = [...new Set(data.map((row) => row[GROUPING]))].filter((item) => typeof(item) === 'string')

// Vertical
const abundance_vvals = data.map((row) => parseFloat(row[ABUNDANCE_VERTICAL]));
const abundance_numeric_vvals = abundance_vvals.filter((val) => !Number.isNaN(val));
const abundance_minv = Math.min(...abundance_numeric_vvals)
const abundance_maxv = Math.max(...abundance_numeric_vvals)


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
var abundance_y = d3v4.scaleLinear()
  .domain([abundance_minv - 1, abundance_maxv + 1])          // Note that here the Y scale is set manually
  .range([v_adjust + height, v_adjust])

abundance_svg.append("g").call(d3v4.axisLeft(abundance_y))

// Features of the histogram
var histogram = d3v4.histogram()
      .domain(abundance_y.domain())
      .thresholds(abundance_y.ticks(20))    //  Number of Bins
      .value(d => d)
// End setup


// Initialize
updateAbundance(data)