// Begin Volcano section
import d3v3 from './d3.v3.js'

// --- Constants --- //

// Parametrize columns used
const VOLCANO_HORIZONTAL = 'log2FoldChange'
const VOLCANO_VERTICAL = 'magstat'

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Begin Volcano Function Definitions
d3v3.helper = {};
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

export function click_circle(pD, pI) {
    var filename = '304/Abundances/' + pD.gene_name + '.csv'
    console.log(filename)
    var data = readCSVFile(filename)
    updateAbundance(data)
    //alert(pD.gene_name)
}

export function reset_axis() {
  svg.transition().duration(500)
   .select(".volcano_x.axis")
   .call(volcano_xAxis)

  svg.transition().duration(500)
   .select(".y.axis")
   .call(volcano_yAxis)
}

var idleTimeout
export function idled() { idleTimeout = null; }   

// TODO: parameters?
export function brushend() {
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

export function brushmove() {
  var extent = brush.extent();
  points.classed("selected", function(d) {
    //console.log(extent)
    var h_brushed = extent[0][0] <= d[VOLCANO_HORIZONTAL] && d[VOLCANO_HORIZONTAL] <= extent[1][0]
    var v_brushed = extent[0][1] <= d[VOLCANO_VERTICAL] && d[VOLCANO_VERTICAL] <= extent[1][1]
    return h_brushed && v_brushed;
  });
}

export function updateVolcano(event) {

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

// TODO: David, adjust axis labels "less / more expression" etc.
export function create_axis_labels(svg, width, height) {
    let font_family = 'Arial'

    // Horizontal axis label
    svg.append("text")
        .attr("class", "x label left")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.bottom - margin.top)
        .text("More Expression")
        .attr('font-size', '10px')
        .attr('font-family', font_family)

    svg.append("text")
        .attr('class', 'x label right')
        .attr('text-anchor', 'Begin')
        .attr('x', 0)  // Here
        .attr('y', height + margin.bottom - margin.top) // Here
        .text('Less Expression')
        .attr('font-size', '10px')
        .attr('font-family', font_family)    

    // Vertical axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", 0)
        .attr("x", -(height / 2))
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Signal Strength")
        .attr("font-size","10px")
        .attr('font-family', "Arial")
}
// End Volcano Function Definitions 

export function setupCanvas(svg) {
    // Create the SVG
    svg.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + 
            margin.left + "," + margin.top + ")");

    // Add the viewbox
    svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} 
        ${height + margin.top + margin.bottom}`);        

    // Create axis labels
    create_axis_labels(svg, width, height)

    // Add clip defs
    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    return [margin, width, height]
}

export function initializeCanvas(svg) {
    var volcanoPath = 'http://localhost:8000/Experiments/React/dashboard-v4-cra/src/'
    var volcanoDataPath = volcanoPath + 'Data/__secrets__01/'
    var data = readCSVFile(volcanoDataPath + "Volcanoes/B Cells.csv");
    console.log(data)

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

    console.log(volcano_y)
    console.log(volcano_yAxis)

    // Modify svg
    // TODO: David, horizontal bar adjuster. 
    var height_adjust = 0//35
    svg.append("g")
        .attr("class", "volcano_x axis")
        .attr("clip-path", "url(#clip)")
        .attr("transform", "translate(0," + (height+margin.bottom-margin.top) + ")")
        .call(volcano_xAxis);

    // TODO: David, vertical axis adjuster 
    var lateral_adjust = 0//25
    svg.append("g")
        .attr("class", "y axis")
        .attr('transform', "translate(" + (width/2) + "," + (margin.bottom-margin.top) + ")")
        .call(volcano_yAxis);

    svg.append("g")
        .attr("class", "brush")
        .call(brush)
          .selectAll('rect')
          .attr('height', height);
}

// TODO: Move this to a 'shared-utils.js' file and reference it in
// both abundance and volc utils. 
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