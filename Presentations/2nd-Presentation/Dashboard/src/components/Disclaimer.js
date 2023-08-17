import React from 'react'
import { useHistory } from 'react-router-dom'
import * as commonUtils from './commonUtils.js'
import ComponentsCollection from './newUiIdeas.js'
import DisclaimerUI from './DisclaimerUI.js'

const Disclaimer = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] = React.useState(false)

    const handleLogin = () => {
        // Replace this with your actual login logic
        setIsLoading(true);
        // Simulate a login request delay
        setTimeout(() => {
            setIsLoading(false);
            console.log(`Disclaimer Signed. Redirecting to AbundanceVolcano.`);
            history.push('/HomePage')
        }, 1500);
    };


    return (

        <div className="flex w-disclaimer">            
            <div className="bg-gray-800 py-6 px-6 rounded-3xl">

                {/* Just Text */}
                <div className="flex justify-between text-white items-center mb-8">
                    <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>Disclaimer</p>
                </div>

                <div className="flex flex-wrap">
                    <div className="p-4 rounded-3xl bg-gray-300">

                    <div className="p-4 bg-white rounded-3xl">
                        <DisclaimerUI />
                    </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Disclaimer