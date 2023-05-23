import * as abundance from './abundance_main.js'

const Abundance = () => {
    const svgRef = React.useRef(null)
    const real_data = true

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