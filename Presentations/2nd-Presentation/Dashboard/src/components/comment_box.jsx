import React, { useState } from 'react';
import * as commonUtils from './commonUtils.js'

async function sendFeedback(feedbackText) {
  const url = commonUtils.feedbackPath + 'feedback'; // Replace with the actual URL of your backend service

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: feedbackText }),
    });

    if (response.ok) {
      console.log('Feedback sent successfully.');
      // You can handle successful response here if needed.
    } else {
      console.error('Failed to send feedback.');
      // You can handle error response here if needed.
    }
  } catch (error) {
    console.error('Error occurred while sending feedback:', error);
    // You can handle any other errors here if needed.
  }
}

const CommentBox = () => {
  const [isCircle, setIsCircle] = useState(true);
  const [inputText, setInputText] = useState('');
  const [sendText, setSendText] = useState("Send!")

  const handleClick = () => {
    setIsCircle(!isCircle);
  };


  const handleClickSend = () => {
    setSendText(sendText === "Send!" ? "Sent!" : "Send!")
    sendFeedback(inputText)
    setInputText('')
  }

  const handleInputChange = (event) => {
    setSendText(sendText === "Sent!" ? "Send!" : "Send!")
    setInputText(event.target.value)
  }

  return (
    <div className="flex items-center justify-center h-16">
      {isCircle ? (
        <div>
            <div
            className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              onClick={handleClick}
            >
                Feedback?
            </div>
        </div>
      ) : (
        <div>
            <div className="flex flex-col items-center">
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
                  value={inputText}
                  onChange={handleInputChange}
                />
                <div className="flex">
                    <div
                    className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
                      onClick={handleClick}
                    >
                        Dismiss
                    </div>


                    <div
                    className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
                    onClick={handleClickSend}
                    >
                        {sendText}
                    </div>

                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CommentBox;

