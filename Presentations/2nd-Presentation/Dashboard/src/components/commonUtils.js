var deployed = true;
import CommentBox from './comment_box'

export const feedbackPath = deployed ? 'https://samplereportfeedback.imyoo.health/' : 'http://localhost:31338/'

export const Overhead = ({ children, name }) => {
    return (
        <div className="lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

            {/* Just Text */}
            <div className="flex justify-between text-white items-center mb-8">
                <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
                    {name}
                </p>
            </div>

            <div className="flex flex-wrap">
                <div className="p-4 rounded-3xl bg-gray-300">

                    <div className="p-7 bg-white rounded-3xl">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export const CellAbundanceSpecificOverhead = ({ children, name }) => {
    return (
        <div className="lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

            {/* Just Text */}
            <div className="flex justify-between text-white items-center mb-8">
                <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
                    {name}
                </p>
            </div>

            <div className="flex flex-wrap">
                <div className="p-4 rounded-3xl bg-gray-300">

                    <div className="p-7 bg-white rounded-3xl">
                        {children}
                    </div>
                </div>

                <div className="p-7 bg-white rounded-3xl">
                    <CommentBox />
                </div> 
            </div>

        </div>
    )
}

