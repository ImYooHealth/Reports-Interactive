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

              {/* Circle */}
              <div className="flex items-center justify-center">
                  <svg height="100" width="100">
                    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                  </svg>
              </div>
              <div className="flex items-center justify-center">              
                  {/* Circle */}
                  <svg height="100" width="100">
                    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                  </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Content;
