const VOLCANO_HORIZONTAL = 'log2FoldChange'
const VOLCANO_VERTICAL = 'stat'

d3v3.helper = {};

function click_circle(pD, pI) {
    alert(pD.gene_name)
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

function transition_data() {
  svg.selectAll(".volcano_point")
  .data(data)
  .transition()
  .duration(500)
  .attr("cx", function(d) { return volcano_x(d[VOLCANO_HORIZONTAL]); })
  .attr("cy", function(d) { return volcano_y(d[VOLCANO_VERTICAL]); });
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
        idleTimeout = setTimeout(idled, 350);
        return
    }
    volcano_x.domain([minh, maxh])
    volcano_y.domain([minv, maxv])
  } else {
    volcano_x.domain([extent[0][0], extent[1][0]])
    volcano_y.domain([extent[0][1], extent[1][1]])
    points.classed("selected", false);
    d3v3.select(".brush").call(brush.clear());
  }

  transition_data();
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

    // Vertical
    const vvals = data.map((row) => parseFloat(row[VOLCANO_VERTICAL]));
    const numeric_vvals = vvals.filter((val) => !Number.isNaN(val));
    const minv = Math.min(...numeric_vvals)
    const maxv = Math.max(...numeric_vvals)

    volcano_x.domain([minh, maxh])
    volcano_y.domain([minv, maxv]) 

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
    
    transition_data();
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
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

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
var data = readCSVFile("304/Volcanoes/Monocytes.csv");

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

// Vertical
const vvals = data.map((row) => Math.abs(parseFloat(row[VOLCANO_VERTICAL])));
const numeric_vvals = vvals.filter((val) => !Number.isNaN(val));
const minv = Math.min(...numeric_vvals)
const maxv = Math.max(...numeric_vvals)

var volcano_x = d3v3.scale.linear()
    .domain([minh, maxh])
    .range([0, width]);

var volcano_y = d3v3.scale.linear()
    .domain([0, 1])
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
var data = updateVolcano({target: {value: "304/Volcanoes/Monocytes.csv"}})