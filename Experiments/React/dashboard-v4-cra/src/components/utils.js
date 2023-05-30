import * as d3v4 from './d3.v4.js'

// State

// data I don't have
var GROUPING
var ABUNDANCE_VERTICAL
var SELF
var data
var abundance_y_scale
var abundance_svg
var abundance_y_axis
var histogram
var data_groups
var abundance_x
var margin

// var const or let missing and that's unexamined
var bins

// var const or let missing and that's fine
var input
var allBins
var lengths
var longest

// Functions used only here
function setState(state) {

    // AV should stay
    ABUNDANCE_VERTICAL = state.ABUNDANCE_VERTICAL
    abundance_svg = state.abundance_svg

    // Unexamined
    abundance_y_scale = state.abundance_y_scale
    abundance_y_axis = state.abundance_y_axis
    histogram = state.histogram
    data_groups = state.data_groups
    console.log('Grouping is: ')
    console.log(GROUPING)
    GROUPING = state.GROUPING
    console.log('Now grouping is:')
    console.log(GROUPING)

    abundance_x = state.abundance_x

    margin = state.margin
}

// Begin section functions used by both
// Read the data and compute summary statistics for each species
export function readCSVFile(filePath) {
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
    console.log(event.target.value)
    var theData = readCSVFile(event.target.value)
    console.log(event.target.value)
    updateAbundance(theData)
}

export function setPointJitter(theData) {

  console.log('vvv theData vvv')
  console.log(theData);
  var bins

  console.log

  var sumstat = d3v4.nest()  // nest function allows to group the calculation per level of a factor
  .key(function(d) { return d[GROUPING];})
  .rollup(function(d) {   // For each key..
    input = d.map(function(g) { return g[ABUNDANCE_VERTICAL];})    // Keep the variable called Sepal_Length
    bins = histogram(input)   // And compute the binning on it.
    return(bins)
  })
  .entries(theData)

  console.log('vvv sumstat')
  console.log(sumstat)

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
    console.log('vvv group vvv')
    console.log(group)
    console.log('^^^ group ^^^')
    let groupstat = null;

    for(var i in sumstat) {
        console.log(i)
        console.log(sumstat[i])
      if(sumstat[i]["key"] == group) {
        console.log(sumstat[i]['key'])
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

  console.log('Leaving setPointJitter and theData is:')
  console.log(theData)
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

  console.log('In addPoints and just about to visit setPointJitter and theData is:')
  console.log(theData)
  theData = setPointJitter(theData);
  console.log('Just arrived back to addPoints from setPointJitter and theData is:')
  console.log(theData)

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

// Begin Abundance Function Definitions
// TODO: index.['likeThis'], pass field names as parameters. 
export function addViolin(theData, margin) {
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

export function updateAxes(theData, ABUNDANCE_VERTICAL, abundance_svg) {

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
  setState(state)
  updateAxes(theData, ABUNDANCE_VERTICAL, abundance_svg);
  removeFeatures();
  addViolin(theData, state.margin)
  addPoints(theData)
}
// End Abundance function definitions

{/*
// Begin Volcano Function Definitions
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
        .on('click', click_circle);
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

function click_circle(pD, pI) {
    var filename = '304/Abundances/' + pD.gene_name + '.csv'
    console.log(filename)
    var data = readCSVFile(filename)
    updateAbundance(data)
    //alert(pD.gene_name)
}

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
// End Volcano Function Definitions 
*/}