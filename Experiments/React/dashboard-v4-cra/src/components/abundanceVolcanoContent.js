import Circle from './circle';
import Abundance from './abundance.js'
import MyComponent from './demo_component.js'

const Content = ({ title }) => (
    <div className="lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

      {/* Just Text */}
      <div className="flex justify-between text-white items-center mb-8">
        <p className="text-2xl font-bold">{title}</p>
        <p className="">December, 12</p>
      </div>

      <div className="flex flex-wrap">

          {/* Abundance */}

            <div className="p-4 rounded-3xl bg-gray-300">
              {/* Abundance */}
              <div className="p-10 bg-white rounded-3xl">

                <Abundance />

              </div>
            </div>


      </div>

    </div>
);

export default Content;