import * as commonUtils from './commonUtils.js'
import ComponentsCollection from './newUiIdeas.js'

const Consent = () => {
    return (
      <div className="lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

        {/* Just Text */}
        <div className="flex justify-between text-white items-center mb-8">
          <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>Consent Form</p>
        </div>

        <div className="flex flex-wrap">
          <div className="p-4 rounded-3xl bg-gray-300">

            <div className="p-7 bg-white rounded-3xl">
                <ComponentsCollection />
            </div>

          </div>

        </div>
      </div>
    );
}

export default Consent