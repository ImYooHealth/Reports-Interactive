import CommentBox from './comment_box'

// Deployment constants
<<<<<<< HEAD
export const deployed = false;
=======
export const deployed = true;
>>>>>>> 28da6fedf9f7d61112aa7fb148cd54a491daeb79
export const dataPath = deployed ? 'https://samplereportdata.imyoo.health/' : 'http://localhost:31339/';
export const feedbackPath = deployed ? 'https://samplereportfeedback.imyoo.health/' : 'http://localhost:31338/'

export const Overhead = ({ children, title }) => {
    return (
        <div className="w-textPage bg-gray-800 py-6 px-6 rounded-3xl">

            {/* Just Text */}
            <div className="flex justify-between text-white items-center mb-4">
                <p style={{fontFamily: "Space Grotesk"}} className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
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

export const DisclaimerUnsigned = ({ children, title }) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-800 py-6 px-6">

            <div className="flex flex-col">
                {/* Just Text */}
                <div className="flex justify-center text-white items-center mb-4">
                    <p style={{fontFamily: "Space Grotesk"}} className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
                        {title}
                    </p>
                </div>

                <div className="flex flex-wrap w-textPage">
                    <div className="p-4 rounded-3xl bg-gray-300">

                        <div className="p-4 bg-gray-100 rounded-3xl">
                            {children}
                        </div>
                    </div>
                    <CommentBox />
                </div>
            </div>
        </div>

    )
}

export const CellAbundanceSpecificOverhead = ({ children, title }) => {
    return (
        <div className="bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

            {/* Just Text */}
            <div className="flex justify-between text-white items-center mb-4">
                <p style={{fontFamily: "Space Grotesk"}} className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
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

export default Overhead;
