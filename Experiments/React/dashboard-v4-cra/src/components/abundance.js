import * as utils from './utils.js'

const Abundance = () => {
    const svgRef = React.useRef(null)
    const real_data = true
/*
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
*/
    // Constants
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;    

    React.useEffect(() => {
        const svgEl = d3v4.select(svgRef.current)

        svgEl
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
    })
}