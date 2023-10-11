import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as CommonUtils from './CommonUtils.js'
import DisclaimeUI from './DisclaimerUI.js'

const Disclaimer = ({onVisit, hasVisitedDisclaimer}) => {
    return (
        <div>
            {!hasVisitedDisclaimer ? (
                <CommonUtils.DisclaimerUnsigned title="Disclaimer">
                    <DisclaimeUI onVisit={onVisit}/>
                </CommonUtils.DisclaimerUnsigned>
            ) : (
                <CommonUtils.Overhead title="Disclaimer">
                    <DisclaimeUI onVisit={onVisit}/>
                </CommonUtils.Overhead>
            )}
        </div>
    );
}

export default Disclaimer