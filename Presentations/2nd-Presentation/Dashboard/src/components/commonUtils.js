var deployed = true;
import CommentBox from './comment_box'

export const feedbackPath = deployed ? 'https://samplereportfeedback.imyoo.health/' : 'http://localhost:31338/'

export const Overhead = ({ children, title }) => {
    return (
        <div className="w-textPage bg-gray-800 py-6 px-6 rounded-3xl">

            {/* Just Text */}
            <div className="flex justify-between text-white items-center mb-4">
                <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
                    {title}
                </p>
            </div>

            <div className="flex flex-wrap">
                <div className="p-4 rounded-3xl bg-gray-300">

                    <div className="p-4 bg-gray-100 rounded-3xl">
                        {children}
                    </div>
                </div>
                    <CommentBox />
            </div>
        </div>
    )
}

export const CellAbundanceSpecificOverhead = ({ children, title }) => {
    return (
        <div className="bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

            {/* Just Text */}
            <div className="flex justify-between text-white items-center mb-4">
                <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
                    {title}
                </p>
            </div>

            <div className="flex flex-wrap">
                <div className="p-4 rounded-3xl bg-gray-300">

                    <div className="px-6 py-3 bg-gray-100 rounded-3xl">
                        {children}
                    </div>
                </div>

                <CommentBox />
            </div>

        </div>
    )
}

