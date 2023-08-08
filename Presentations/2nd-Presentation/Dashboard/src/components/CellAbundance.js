import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/CellAbundance/utils.js'

import ComponentsCollection from './newUiIdeas.js'

const CellAbundance = () => {
    return (
        <commonUtils.Overhead>
            <p>
                {utils.placeholder}
            </p>
            <ComponentsCollection />
        </commonUtils.Overhead>
    )
}

export default CellAbundance;