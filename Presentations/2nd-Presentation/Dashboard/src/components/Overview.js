import { Link } from 'react-router-dom'
import * as CommonUtils from './CommonUtils.js'
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
            <CommonUtils.Overhead title="Overview">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p style={{fontFamily: "Space Grotesk"}} className="w-1/2"> </p>
                        <p style={{fontFamily: "Space Grotesk"}} className="text-2xl pl-20">Your Immune Army</p>
                    </div>

                    <div className="flex flex-row pl-2 pb-10">
                        <div className="flex flex-col w-1/2">
                            <p style={{fontFamily: "Space Grotesk"}} className=" text-lg pb-2">{t1p1}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-2">{t1p2}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-2">{t1p3}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg">{t1p4}</p>
                        </div>
                        <div className="flex flex-col w-1/2">
                            {/* Deployment: edit path */}
                            <img className="pl-5 p-2" src={`${CommonUtils.dataPath}/Overview/sunburst.svg`} />
                            <div className="text-center justify-right inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-lg">
                                <Link to="/CellAbundance">See how you compare to others</Link>
                            </div>
                        </div>                            
                    </div>

                    <div className="flex flex-row">
                        <p style={{fontFamily: "Space Grotesk"}} className="text-2xl pl-2">Welcome to ImYoo's Database!</p>
                    </div>

                    <div className="flex flex-row">
                        {/* Deployment: edit path */}
                        <img className="w-1/2 h-full mt-6" src={`${CommonUtils.dataPath}/Overview/tsne.png`}  />
                        <div className="flex flex-col w-1/2">
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-1">{t2p1}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-1">{t2p2}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-1">{t2p3}</p>
                        </div>
                    </div>
                </div>
            </CommonUtils.Overhead>
        </div>
    )
}

export default Overview;