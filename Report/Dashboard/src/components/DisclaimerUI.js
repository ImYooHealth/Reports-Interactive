import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const DisclaimerUI = ({onVisit}) => {
    const history = useHistory()
    const [isLoading, setIsLoading] = React.useState(false)    
  const [isChecked, setIsChecked] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  // Event handler for checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Event handler for text field change
  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleLogin = () => {
    if(! (isChecked && textFieldValue != "")) {
        console.log('Button is not enabled')
        return
    }

    // Replace this with your actual login logic
    setIsLoading(true);
    // Simulate a login request delay
    setTimeout(() => {
        setIsLoading(false);
        console.log(`Disclaimer Signed. Redirecting to AbundanceVolcano.`);
        onVisit()
        history.push('/Overview')
    }, 1500);
  };


  // Disable the button if the checkbox is not checked or text field is empty
  const isButtonDisabled = !isChecked || textFieldValue.trim() === '';

  return (
    <div>
        <p style={{fontFamily: "Space Grotesk"}} className='text-left text-xl pt-3 pl-3 pr-3'>
            {text1}
        </p>

        <ul className='list-disc pb-8 pl-8 pr-8 pt-4'>
            <li> For research use only. No usage for diagnostic purposes is recommended or permitted. </li>
            <li> The results provided to you are part of a research study investigating expression of genes in various immune cell types. </li>
            <li> These assays and its results were not performed at a CLIA certified facility. </li>
            <li> The metrics of specificity, sensitivity, and accuracy used in ImYoo’s assay have not been validated. The results in this report are not intended to replace a visit to a healthcare professional. It is the participant's responsibility to consult with a healthcare professional regarding any medical advice and the status of their health. </li>
            <li> Do not use the results reported in this report to change course of existing treatment </li>
            <li> Results in this report should not be used to make any medical decisions. </li>
            <li> ImYoo’s assay measures RNA in different immune cell types and is not a substitute for clinical assays measuring blood counts or protein levels. </li>
            <li> ImYoo is not a replacement for other gene expression assays that have been medically validated or are operating under CLIA license. </li>
            <li> ImYoo’s assay does not provide complete information on your immune state and does not reflect or suggest how well your immune system will protect you against various adverse events (such as viruses, bacteria, etc).</li>
        </ul>

        <label className="flex flex-row items-center justify-center mx-8">
            <input className="h-6 w-6 mx-5 outline border-gray-900" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
            <p style={{fontFamily: "Space Grotesk"}} className='text-center font-bold text-xl mr-10'>
                I acknowledge I have read the above and understand this report is not for diagnostic use
            </p>
        </label>


        <div className="flex flex-col items-center pb-3">
            <div className="flex flex-row p-6">
                <p style={{fontFamily: "Space Grotesk"}} className='font-bold text-xl p-3'>Signed:</p>
                <input className='p-3 border border-gray-900 rounded-2xl' type="text" value={textFieldValue} onChange={handleTextFieldChange} placeholder="Your Name" />
            </div>

            <button
                type="button"
                className="bg-blue-500 text-white border border-gray-900 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                onClick={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? 'Welcome' : 'Continue To Report'}
            </button>                  
        </div>

            
    </div>
  );
};

export default DisclaimerUI;

const text1 = 'The results of ImYoo’s assay are being returned to you as part of a research study. ImYoo’s assay, which incorporates single-cell RNA sequencing, has not been validated in a clinical setting and is not intended for diagnostic or therapeutic purposes.'
