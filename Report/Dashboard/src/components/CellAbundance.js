import React from "react"
import * as CommonUtils from './CommonUtils.js'
import * as utils from './Resources/CellAbundance/utils.js'
import Abundance from './Resources/CellAbundance/abundance'
import Volcano from './Resources/CellAbundance/volcano'
import CommentBox from './comment_box'

let genes = utils.getGenes()


const CellAbundance = ({title}) => { 
    const [currentGene, setCurrentGene] = React.useState(genes[0])  // TODO: Just tagging that this is where the initial gene is set

    const handleGeneChange = (gene) => {
        setCurrentGene(gene)
    }

    return (
        <div className="flex">
            <div className="bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

                {/* Just Text */}
                <div className="flex justify-between text-white items-center mb-4">
                    <p style={{fontFamily: "Space Grotesk"}} className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>
                        Cell Abundance
                    </p>
                </div>

                <div className="flex flex-wrap">
                    <div className="p-4 rounded-3xl bg-gray-300">
                        <div className="px-6 py-3 bg-white rounded-3xl">
                            {/* 
                            https://www.notion.so/imyoo/67083843abdc47b0b73fcee1e0471c47?v=8ae7653fd3a44bfdb2d2e90d084f6c8f&p=df52504933eb4fe68d290c2b27d8bf78&pm=s
                            */}
                            <div style={{display: 'none'}}>
                                <Volcano changeAbundanceGene={handleGeneChange}/>
                            </div>
                                                        
                            <Abundance currentGene={currentGene} handleGeneChange={handleGeneChange}/>
                        </div>

                    </div>

                    <CommentBox />
                </div>


            </div>

            {/* The side items */}
            <div className="bg-gray-900 py-6 rounded-3xl ml-8" style={{ width: '600px', minWidth: '600px' }}>

                {/* Just padding */}
                <div className="py-4 flex justify-between text-white items-center mb-8">
                </div>

                <div className="flex mb-1 p-4 rounded-3xl bg-gray-300">
                    <div className="bg-white rounded-3xl">
                        <img className=" mx-auto" src={`${CommonUtils.dataPath}/CellAbundance/Definitions.png`} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CellAbundance;

