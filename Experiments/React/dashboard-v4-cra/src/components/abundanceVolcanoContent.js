import Volcano from './volcano.js'
import Abundance from './abundance.js'
import ScatterPlot from './scatterPlot.js'
import Scatterplot from './scatterplot-ex2.js'
import Scatterplot_ex3 from './scatterplot-ex3.js'

const Content = ({ title }) => (
  <div className="lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

    {/* Just Text */}
    <div className="flex justify-between text-white items-center mb-8">
      <p className="text-2xl font-bold">{title}</p>
    </div>

    <div className="flex flex-wrap">
      <div className="p-4 rounded-3xl bg-gray-300">

        {/* Abundance */}
        <div className="p-7 bg-white rounded-3xl">
          <Volcano />
        </div>

        <div className="p-1">
        </div>

        <div className="p-7 bg-white rounded-3xl">
          <Abundance />
        </div>

        {/* Experimental */}
        <div className="p-1">
        </div>

        <div className="p-7 bg-white rounded-3xl">
          <ScatterPlot />
        </div>

        <div className="p-1">
        </div>

        <div className="p-7 bg-white rounded-3xl">
          <Scatterplot />
        </div>

        <div className="p-1">
        </div>

        <div className="p-7 bg-white rounded-3xl">
          <Scatterplot_ex3 />
        </div>

      </div>
    </div>
  </div>
);

export default Content;