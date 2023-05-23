import Circle from './circle';
import Abundance from './circle'

const Content = ({ title }) => (
  <div className="flex flex-wrap">
  beyond outer
    <div className="w-full lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl">
      <div className="flex justify-between text-white items-center mb-8">
        <p className="text-2xl font-bold">{title}</p>
        <p className="">December, 12</p>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-4/12">
        
          <div className="p-2">
            <div className="p-4 rounded-3xl bg-gray-300">
              <div className="flex items-center justify-b">
                <span className="text-sm">AbundanceVolcano</span>
              </div>

              {/* d3 experiment */}
              <div className='the_circle flex items-center justify-center'>
                <Circle cx="10" cy="20"/>
              </div>
              {/* d3 experiment */}
              <div className='the_circle flex items-center justify-center'>
                <Abundance />
              </div>
            </div>
          </div>

          {/* One-Circle D3 Experiment */}
          <div className="p-2">

            <div className="p-4 rounded-3xl bg-gray-300">

              {/* Text */}
              <div className="flex items-center justify-b">
                <span className="text-sm">AbundanceVolcano</span>
              </div>

              {/* Circle */}
              <div className='the_circle flex items-center justify-center'>
                <Circle cx="10" cy="20"/>
              </div>

              {/* Abundance */}
{/*              <div className='the_circle flex items-center justify-center'>
                <Abundance />
              </div>
*/}            </div>
          </div>
          {/* One-Circle D3 Experiment */}

        </div>
      </div>
    </div>
  </div>
);

export default Content;
