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

// Function definitions
// Read the data and compute summary statistics for each species
function readCSVFile(filePath) {
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
            .y(function(d){ return(abundance_y_scale(d.x0)) })
            .curve(d3v4.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3v4.curveStep to see the difference
        )
}

function setPointJitter(theData) {

  console.log(theData);

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
function addPoints(theData) {

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

    if(datum[SELF] == "True") {
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

function updateAbundance(theData) {

  updateAxes(theData);
  removeFeatures();
  addViolin(theData)
  addPoints(theData)
  // removeNaNPoints()
}

// function removeNaNPoints() {
//     abundance_svg.selectAll('circle').filter(function() {
//         return d3.select(this).attr('cx') == "NaN"
//     }).remove()

//     abundance_svg.selectAll('circle').filter(function() {
//         return d3.select(this).attr('cy') == "NaN"
//     }).remove()
// }

function removeFeatures() {

  // Remove violin
  abundance_svg.selectAll('.violin').remove()

  // Remove dots in all data groups
  for(group in data_groups) {
    let point_class = data_groups[group]["point_class"];
    let class_selector = `\.${point_class}`;
    abundance_svg.selectAll(class_selector).remove();
  }
}

function respondToSelection(event) {
    console.log(event.target.value)
    var theData = readCSVFile(event.target.value)
    console.log(event.target.value)
    updateAbundance(theData)
}

function updateAxes(theData) {

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
// End function definitions

// Add response
const abundance_selector = document.querySelector('.abundance_dropdown_class')
abundance_selector.addEventListener("change", respondToSelection)

// Prepare to shift abundance down
const v_adjust = 0//200

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = v_adjust + 500 - margin.top - margin.bottom;

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

//-----------

const VOLCANO_HORIZONTAL = 'log2FoldChange'
const VOLCANO_VERTICAL = 'magstat'

d3v3.helper = {};

function click_circle(pD, pI) {
    var filename = '304/Abundances/' + pD.gene_name + '.csv'
    console.log(filename)
    var data = readCSVFile(filename)
    updateAbundance(data)
    //alert(pD.gene_name)
}

// Begin Function Definitions
// TODO: Move function defs into their own file
d3v3.helper.tooltip = function(){
    var tooltipDiv;
    var bodyNode = d3v3.select('body').node();

    function tooltip(selection){

        selection.on('mouseover.tooltip', function(pD, pI) {
            // Clean up lost tooltips
            d3v3.select('body').selectAll('div.tooltip').remove();
            // Append tooltip
            tooltipDiv = d3v3.select('body')
                           .append('div')
                           .attr('class', 'tooltip')
            var absoluteMousePos = d3v3.mouse(bodyNode);
            tooltipDiv.style({
                left: (absoluteMousePos[0] + 10)+'px',
                top: (absoluteMousePos[1] - 40)+'px',
                'background-color': 'white',
                border: 'solid',
                'border-width': "2px",
                'border-radius': '5px',
                padding: '5px',
                padding: '5px',
                position: 'absolute',
                'z-index': 1001,
                'box-shadow': '0 1px 2px 0 #656565'
            });

            var only_line = '<p>Gene: ' + pD.gene_name + '</p>'
            tooltipDiv.html(only_line)
        })
        .on('mousemove.tooltip', function(pD, pI) {
            // Move tooltip
            var absoluteMousePos = d3v3.mouse(bodyNode);
            tooltipDiv.style({
                left: (absoluteMousePos[0] + 20)+'px',
                top: (absoluteMousePos[1] - 30)+'px'
            });
        })
        .on('mouseout.tooltip', function(pD, pI) {
            // Remove tooltip
            tooltipDiv.remove();
        })
        .on('click', click_circle
            /*
            function(pD, pI) {
                console.log('foobar')
                console.log(pD.gene_name)
                console.log(pD)
                console.log(pI)
           }
           */
        );
    }

    tooltip.attr = function(_x){
        if (!arguments.length) return attrs;
        attrs = _x;
        return this;
    };

    tooltip.style = function(_x){
        if (!arguments.length) return styles;
        styles = _x;
        return this;
    };

    return tooltip;
};

// function transition_data(data) {
//   svg.selectAll(".volcano_point")
//   .data(data)
//   .transition()
//   .duration(500)
//   .attr("cx", function(d) { return volcano_x(d[VOLCANO_HORIZONTAL]); })
//   .attr("cy", function(d) { return volcano_y(d[VOLCANO_VERTICAL]); });
// }

function reset_axis() {
  svg.transition().duration(500)
   .select(".volcano_x.axis")
   .call(volcano_xAxis)

  svg.transition().duration(500)
   .select(".y.axis")
   .call(volcano_yAxis)
}

var idleTimeout
function idled() { idleTimeout = null; }   

// TODO: parameters?
function brushend() {
  var extent = brush.extent()
  console.log(extent)

  if(extent[0][0] == extent[1][0] || extent[0][1] == extent[1][1]) {
    // Another way to write the conditional below
    // if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
    if (!idleTimeout) {
        idleTimeout = setTimeout(idled, 1000);
        return
    }
    volcano_x.domain([-maxx, maxx])
    volcano_y.domain([0, maxv])
  } else {
    volcano_x.domain([extent[0][0], extent[1][0]])
    volcano_y.domain([extent[0][1], extent[1][1]])
    points.classed("selected", false);
    d3v3.select(".brush").call(brush.clear());
  }

  // transition_data();
  reset_axis();  
}

function brushmove() {
  var extent = brush.extent();
  points.classed("selected", function(d) {
    //console.log(extent)
    var h_brushed = extent[0][0] <= d[VOLCANO_HORIZONTAL] && d[VOLCANO_HORIZONTAL] <= extent[1][0]
    var v_brushed = extent[0][1] <= d[VOLCANO_VERTICAL] && d[VOLCANO_VERTICAL] <= extent[1][1]
    return h_brushed && v_brushed;
  });
}

function updateVolcano(event) {

    var data = readCSVFile(event.target.value)

    // Find ranges for axes
    // Horizontal
    const hvals = data.map((row) => parseFloat(row[VOLCANO_HORIZONTAL]));
    const numeric_hvals = hvals.filter((val) => !Number.isNaN(val));
    const minh = Math.min(...numeric_hvals);
    const maxh = Math.max(...numeric_hvals);
    const maxx = Math.max(...[-minh, maxh]) * 1.10;

    // Vertical
    const vvals = data.map((row) => parseFloat(row[VOLCANO_VERTICAL]));
    const numeric_vvals = vvals.filter((val) => !Number.isNaN(val));
    const maxv = Math.max(...numeric_vvals) * 1.10;

    volcano_x.domain([-maxx, maxx])
    volcano_y.domain([0, maxv]) 

    svg.selectAll(".volcano_point").remove()

    points = svg.selectAll(".volcano_point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "volcano_point")
        .attr("clip-path", "url(#clip)")
        .attr("r", 8)
        .attr("cx", function(d) { return volcano_x(d[VOLCANO_HORIZONTAL]); })
        .attr("cy", function(d) { return volcano_y(d[VOLCANO_VERTICAL]); })
        .call(d3v3.helper.tooltip());

    
    points.on('mousedown', function() {
      brush_elm = svg.select(".brush").node();
      new_click_event = new Event('mousedown');
      new_click_event.pageX = d3v3.event.pageX;
      new_click_event.clientX = d3v3.event.clientX;
      new_click_event.pageY = d3v3.event.pageY;
      new_click_event.clientY = d3v3.event.clientY;
      brush_elm.dispatchEvent(new_click_event);
    });
    
    // transition_data(data);
    reset_axis();  

    //console.log(event.target.value)

    return data
}

function create_axis_labels(svg, width, height) {
    let v_axis_label_adjust = -40
    let h_axis_label_adjust = 30
    let font_family = 'Arial'

    // Horizontal axis label
    svg.append("text")
        .attr("class", "x label left")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + h_axis_label_adjust)
        .text("More Expression")
        .attr('font-size', '10px')
        .attr('font-family', font_family)

    svg.append("text")
        .attr('class', 'x label right')
        .attr('text-anchor', 'Begin')
        .attr('x', 0)
        .attr('y', height + h_axis_label_adjust)
        .text('Less Expression')
        .attr('font-size', '10px')
        .attr('font-family', font_family)    

    // Vertical axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", v_axis_label_adjust)
        .attr("x", -(height / 2))
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Signal Strength")
        .attr("font-size","10px")
        .attr('font-family', "Arial")
}

// End Function Definitions 

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
var data = readCSVFile("304/Volcanoes/B Cells.csv");

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
/*
points = svg.selectAll(".volcano_point")
    .data(data)
    .enter().append("circle")
    .attr("class", "volcano_point")
    .attr("clip-path", "url(#clip)")
    .attr("r", 8)
    .attr("cx", function(d) { return volcano_x(d[VOLCANO_HORIZONTAL]); })
    .attr("cy", function(d) { return volcano_y(Math.abs(d[VOLCANO_VERTICAL])); })
    .call(d3v3.helper.tooltip());
*/
// TODO: Make update take either a string or an event, and use only it to create points
const volcano_selector = document.querySelector('.volcano_dropdown_class')
volcano_selector.addEventListener("change", updateVolcano)

// Initialize
var data = updateVolcano({target: {value: "304/Volcanoes/B Cells.csv"}})