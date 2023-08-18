import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/Overview/utils.js'
import ComponentsCollection from './newUiIdeas.js'

const t1p1 = 'Your blood is made up of many different types of cells. In our lab, we remove red blood cells and focus on checking the state of white blood cells.'
const t1p2 = 'On the right are different types of cells that comprise the white blood cells in your sample.'
const t1p3 = 'The inner circle represents the top level hierarchy and the outer circles show a breakdown of subtypes within those major cell types.'
const t1p4 = 'Below you will see definitions of major cell types and their respective functions.'

const t2p1 = 'Your cells are now a part of ImYoo’s human reference transcriptome database. Thank you!'
const t2p2 = 'This is a t-SNE plot of a portion of our database, and your cells are overlayed on top to show you where you land.'
const t2p3 = 'Each dot here is one of your cells, and how close they are to each other represents how similar they are to each other. Cells that group together are often cells of a common type, such as T Cells. By growing our reference database, you are helping us discover more rare and unique cell types and states.'

const Overview = () => {
    return (
        <div className='w-textPage'>
            <commonUtils.Overhead title="Overview">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p className="w-1/2"> </p>
                        <p className="text-2xl pl-20">Your Immune Army</p>
                    </div>

                    <div className="flex flex-row pb-10">
                        <div className="flex flex-col">
                            <p className="text-xl">{t1p1}</p>
                            <p className="text-xl">{t1p2}</p>
                            <p className="text-xl">{t1p3}</p>
                            <p className="text-xl">{t1p4}</p>
                        </div>
                        <img className="w-1/2 pl-5" src="http://localhost:31339/Overview/sunburst.png" />
                    </div>

                    <div className="flex flex-row">
                        <p className="text-2xl pl-1">Welcome to ImYoo's Database!</p>
                        <p className="w-1/3"> </p>
                    </div>

                    <div className="flex flex-row">
                        <img className="w-1/2 pr-5" src="http://localhost:31339/Overview/tsne.png" />
                        <div className="flex flex-col">
                            <p className="text-xl">{t1p1}</p>
                            <p className="text-xl">{t1p2}</p>
                            <p className="text-xl">{t1p3}</p>
                            <p className="text-xl">{t1p4}</p>
                        </div>
                    </div>
                </div>
            </commonUtils.Overhead>
        </div>
    )
}

export default Overview;