import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/CallToAction/utils.js'

import ComponentsCollection from './newUiIdeas.js'

const CallToAction = () => {
    return (
        <commonUtils.Overhead>
            <p>
                {utils.placeholder}
            </p>
            <ComponentsCollection />
        </commonUtils.Overhead>
    )
}

export default CallToAction;