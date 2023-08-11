import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/Overview/utils.js'

import ComponentsCollection from './newUiIdeas.js'

const text_up_left = `Your blood is made up of many different types of cells. In our lab, we remove red blood cells and focus on checking the state of white blood cells.

On the right are different types of cells that comprise the white blood cells in your sample.

The inner circle represents the top level hierarchy and the outer circles show a breakdown of subtypes within those major cell types.

Below you will see definitions of major cell types and their respective functions.  

`

const text_down_right = `Your cells are now a part of ImYoo’s human reference transcriptome database. Thank you!  This is a t-SNE plot of a portion of our database, and your cells are overlayed on top to show you where you land.

Each dot here is one of your cells, and how close they are to each other represents how similar they are to each other. Cells that group together are often cells of a common type, such as T Cells. By growing our reference database, you are helping us discover more rare and unique cell types and states.
`

const Overview = () => {
    return (
        <commonUtils.Overhead>
            <img src="http://localhost:31339/Overview/sunburst.png" />
            <img src="http://localhost:31339/Overview/tsne.png" />
            <p>{text_up_left}</p>
            <p>{text_down_right}</p>
        </commonUtils.Overhead>
    )
}

export default Overview;