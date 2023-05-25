import Circle from './circle';
import Abundance from './abundance.js'
import MyComponent from './demo_component.js'

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

              {/* Only text */}
              <div className="flex items-center justify-b">
                <span className="text-sm">Demo</span>
              </div>

              {/* One Circle */}
              <div className='one_circle flex items-center justify-center'>
                <Circle cx="11" cy="21"/>
              </div>

              {/* A Second Circle */}
              <div className='two_circle flex items-center justify-center'>
                <Circle cx="19" cy="11"/>
              </div>

              {/* variables and data with button demo */}
              <div className='flex items-center justify-center'>
                <MyComponent />
              </div>


 
            </div>
          </div>

{/*
          {/* Abundance */}
          <div className="p-2">

            <div className="p-4 rounded-3xl bg-gray-300">

              {/* Text */}
              <div className="flex items-center justify-b">
                <span className="text-sm">Abundance</span>
              </div>

              {/* Text */}
              <div className="flex items-center justify-b">
                <span className="text-sm">^^^ circle ^^^ | vvv Abundance vvv</span>
              </div>

              {/* Abundance */}
              <div className='the_circle flex items-center justify-center'>
                <Abundance />
              </div>
              
            </div>
          </div>
          {/* One-Circle D3 Experiment //
*/}
        </div>
      </div>
    </div>
  </div>
);

export default Content;
