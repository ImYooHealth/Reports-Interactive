// --- Constants --- //
import './volcano.css'
import d3v3 from './d3.v3.js'
import * as utils from './utils.js'

const VOLCANO_HORIZONTAL = 'log2FoldChange'
const VOLCANO_VERTICAL = 'magstat'
const volcanoPath = utils.dataPath
const volcanoDataPath = volcanoPath + 'Volcanoes/'
const cellTypes = utils.getCellTypes()
const margin = {top: 20, right: 0, bottom: 0, left: 0},
      width = 800 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
var points

// State
var volcano_x
var volcano_y
var data
var svg
var volcano_xAxis
var volcano_yAxis
var brush
var brush_elm
var maxx
var maxv
var changeAbundanceGene

// Zoom
const zoom_enabled = true

// Get gene descriptions
const gene_description = utils.getGeneDescriptions()

// Begin functions
export function updateVolcano(cellTypeName) {
    data = utils.readCSVFile(volcanoDataPath + cellTypeName)
    transition_data(data)
}

// Begin Volcano Function Definitions
export function handleChange(arg) {
    // Reset if zoomed
    idleTimeout = true
    brushend()

    // Handle change
    updateVolcano(arg.value)

    // Reset double-click noticer
    idleTimeout = null
}

export function initialize(svg, changeGene) {
    changeAbundanceGene = changeGene
    setState({'svg': svg})
    setupCanvas()
    initializeCanvas()
    initVolcano()
}


export function setupCanvas() {
    // Clear
    svg.select('*').remove()    

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

export function initializeCanvas() {
    data = utils.readCSVFile(volcanoDataPath + cellTypes[0].value);

    /* Begin Setup axes and brush */
    // Find ranges for axes
    // Horizontal
    const hvals = data.map((row) => parseFloat(row[VOLCANO_HORIZONTAL]));
    const numeric_hvals = hvals.filter((val) => !Number.isNaN(val));
    const minh = Math.min(...numeric_hvals);
    const maxh = Math.max(...numeric_hvals);
    maxx = Math.max(...[-minh, maxh]) * 1.10;

    // Vertical
    const vvals = data.map((row) => Math.abs(parseFloat(row[VOLCANO_VERTICAL])));
    const numeric_vvals = vvals.filter((val) => !Number.isNaN(val));
    maxv = Math.max(...numeric_vvals) * 1.10;

    var volcano_x = d3v3.scale.linear()
        .domain([-maxx, maxx])
        .range([0, width]);

    var volcano_y = d3v3.scale.linear()
        .domain([0, maxv])
        .range([height, 0]);

    brush = d3v3.svg.brush()
        .x(volcano_x)
        .y(volcano_y)
        .on("brush", brushmove)
        .on("brushend", brushend);

    volcano_xAxis = d3v3.svg.axis()
        .scale(volcano_x)
        .orient("bottom");

    volcano_yAxis = d3v3.svg.axis()
        .scale(volcano_y)
        .orient("left")
        .ticks(8);  // TODO: Replace with arrow

    // Modify svg
    svg.append("g")
        .attr("class", "volcano_x axis")
        .attr("clip-path", "url(#clip)")
        .attr("transform", "translate(0," + (height) + ")")
        .call(volcano_xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('transform', "translate(" + (width/2) + ", 0)")
        .call(volcano_yAxis);

    svg.append("g")
        .attr("class", "brush")
        .call(brush)
          .selectAll('rect')
          .attr('height', height);

    setState({'volcano_y': volcano_y, 'volcano_x': volcano_x, 'data': data})

    return data;
}

export function setState(state) {
    //console.log(state)

    var n = Object.keys(state).length
    var i = -1;
    var theCase, theIndex;
    while(i < n) {
        i++

        theCase = Object.keys(state)[i]

        switch(theCase) {
            case 'volcano_x':
                //console.log('hit x')
                volcano_x = state.volcano_x
                break;
            case 'volcano_y':
                //console.log('hit y')
                volcano_y = state.volcano_y
                break;
            case 'data':
                data = state.data
                break;
            case 'svg':
                svg = state.svg
                break;
        }
    }
}

export function initVolcano(path) {
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
        .call(d3v3.helper.tooltip())
        .on('click', click_circle)

/*
    points.on('mousedown', function() {
      var brush_elm = svg.select(".brush").node();
      var new_click_event = new Event('mousedown');
      new_click_event.pageX = d3v3.event.pageX;
      new_click_event.clientX = d3v3.event.clientX;
      new_click_event.pageY = d3v3.event.pageY;
      new_click_event.clientY = d3v3.event.clientY;
      brush_elm.dispatchEvent(new_click_event);
    });
*/
  
    transition_data(data);
    reset_axis();  

    //console.log(event.target.value)

    return data
}

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
                'box-shadow': '0 1px 2px 0 #656565',
                'max-width':  '300px',
            });

            console.log(pD.gene_name)
            console.log(pD.gene_name)
            console.log(pD.gene_name)
            console.log(pD.gene_name)
            console.log(pD.gene_name)
            console.log(pD.gene_name)
            console.log(pD.gene_name)
            console.log(gene_description[pD.gene_name])
            console.log(gene_description)
            console.log(gene_description['ASIC1'])
            console.log(gene_description['DOCK4'])
            console.log(gene_description['MTRNR2L8'])
            var description = gene_description[pD.gene_name]
            if(description != 'No description available' && description !== undefined) {
                var first_line = '<p>Gene: ' + pD.gene_name + '</p>\n'
                var second_line = '<p>' + gene_description[pD.gene_name] + '</p>\n'
                tooltipDiv.html(first_line + second_line)
            } else {
                var first_line = '<p>Gene: ' + pD.gene_name + '</p>\n'
                tooltipDiv.html(first_line)
            }
            
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
        // Interplot Interactivity
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


// TODO: Interplot interactivity
export function click_circle(pD, pI) {
    /*
    unclickAllCircles()

    var clicked = d3v3.select(this)
    var hasClass = clicked.classed('volcano_point_clicked')

    if(hasClass) {
        clicked.attr('class', 'volcano_point')
    } else {
        clicked.attr('class', 'volcano_point_clicked')
    }

    var filename = volcanoDataPath + pD.gene_name

    console.log(filename)
    console.log(pD.gene_name)
    //var data = utils.readCSVFile(filename)
    //updateAbundance(data)  // Here
    */
    changeAbundanceGene(pD.gene_name)
    //alert(pD.gene_name)
}

export function unclickAllCircles() {
    svg.selectAll('.volcano_point_clicked')
        .each(function() {
                var circle = d3.select(this);
                if(circle.classed('.volcano_point_clicked')) {
                    circle.classed('.volcano_point_clicked', false)
                          .classed('.volcano_point', true)
                }
            }
        )
}

export function updateAxes(data){
    /* Begin Setup axes and brush */
    // Find ranges for axes
    // Horizontal
    const hvals = data.map((row) => parseFloat(row[VOLCANO_HORIZONTAL]));
    const numeric_hvals = hvals.filter((val) => !Number.isNaN(val));
    const minh = Math.min(...numeric_hvals);
    const maxh = Math.max(...numeric_hvals);
    maxx = Math.max(...[-minh, maxh]) * 1.10;

    // Vertical
    const vvals = data.map((row) => Math.abs(parseFloat(row[VOLCANO_VERTICAL])));
    const numeric_vvals = vvals.filter((val) => !Number.isNaN(val));
    maxv = Math.max(...numeric_vvals) * 1.10;
    
    volcano_x.domain([-maxx, maxx]);
    volcano_y.domain([0, maxv]);

    svg.select(".y.axis")
        .transition()  // optional, for smooth transition
        .call(volcano_yAxis);

    svg.select(".x.axis")
        .transition()  // optional, for smooth transition
        .call(volcano_xAxis);
}

function transition_data(data) {
    // Unclick all
    //unclickAllCircles()

    if(typeof data === 'undefined') {
        svg.selectAll(".volcano_point")
            .transition()
            .duration(500)
            .attr("cx", function(d) { return volcano_x(d[VOLCANO_HORIZONTAL]); })
            .attr("cy", function(d) { return volcano_y(d[VOLCANO_VERTICAL]); });
    } else {
        svg.selectAll(".volcano_point")
            .data(data)
            .transition()
            .duration(500)
            .attr("cx", function(d) { return volcano_x(d[VOLCANO_HORIZONTAL]); })
            .attr("cy", function(d) { return volcano_y(d[VOLCANO_VERTICAL]); });
    }
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
  if(!zoom_enabled) {
    return
  }
  
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

  transition_data();
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

// TODO: David, adjust axis labels "less / more expression" etc.
export function create_axis_labels(svg, width, height) {
    let font_family = 'Space Grotesk'

    // Horizontal axis label
    svg.append("text")
        .attr("class", "x label left")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.bottom - margin.top)
        .text("More Expression →")
        .attr('font-size', '14px')
        .attr('font-family', font_family)

    svg.append("text")
        .attr('class', 'x label right')
        .attr('text-anchor', 'Begin')
        .attr('x', 0)  // Here
        .attr('y', height + margin.bottom - margin.top) // Here
        .text('← Less Expression')
        .attr('font-size', '14px')
        .attr('font-family', font_family)    

    // Vertical axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", 0)
        .attr("x", -(height / 2))
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Signal Strength*")
        .attr("font-size","14px")
        .attr('font-family', "Space Grotesk")
}
// End Volcano Function Definitions 




