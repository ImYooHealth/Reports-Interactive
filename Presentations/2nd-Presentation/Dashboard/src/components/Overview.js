import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/Overview/utils.js'

import ComponentsCollection from './newUiIdeas.js'

const Overview = () => {
    return (
        <commonUtils.Overhead>
            <p>
                {utils.placeholder}
            </p>
            <ComponentsCollection />
        </commonUtils.Overhead>
    )
}

export default Overview;