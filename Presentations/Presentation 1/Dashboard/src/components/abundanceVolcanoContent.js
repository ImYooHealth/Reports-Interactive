import Volcano from './volcano.js'
import Abundance from './abundance.js'

const Content = ({ title }) => (
  <div className="lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

    {/* Just Text */}
    <div className="flex justify-between text-white items-center mb-8">
      <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>{title}</p>
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

      </div>
    </div>
  </div>
);

export default Content;