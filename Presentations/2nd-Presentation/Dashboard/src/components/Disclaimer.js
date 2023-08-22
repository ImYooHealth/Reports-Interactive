import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as commonUtils from './commonUtils.js'
import DisclaimeUI from './DisclaimerUI.js'

const Disclaimer = ({onVisit, hasVisitedDisclaimer}) => {
    return (
        <div>
            {!hasVisitedDisclaimer ? (
                <commonUtils.DisclaimerUnsigned title="Disclaimer">
                    <DisclaimeUI onVisit={onVisit}/>
                </commonUtils.DisclaimerUnsigned>
            ) : (
                <commonUtils.Overhead title="Disclaimer">
                    <DisclaimeUI onVisit={onVisit}/>
                </commonUtils.Overhead>
            )}
        </div>
    );
}

export default Disclaimer