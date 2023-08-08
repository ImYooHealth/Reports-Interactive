import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/Glossary/utils.js'

import ComponentsCollection from './newUiIdeas.js'

const Glossary = () => {
    return (
        <commonUtils.Overhead>
            <p>
                {utils.placeholder}
            </p>
            <ComponentsCollection />
        </commonUtils.Overhead>
    )
}

export default Glossary;