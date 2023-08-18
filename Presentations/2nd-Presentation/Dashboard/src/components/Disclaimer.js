import React from 'react'
import DisclaimerUI from './DisclaimerUI.js'
import { useHistory } from 'react-router-dom'
import * as commonUtils from './commonUtils.js'

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
        <commonUtils.Overhead title="Disclaimer">
            <DisclaimerUI />
        </commonUtils.Overhead>
    );
}

export default Disclaimer