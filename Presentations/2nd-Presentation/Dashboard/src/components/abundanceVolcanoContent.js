import React from "react"
import CommentBox from './comment_box'

import Volcano from './Resources/AbundanceVolcano/volcano'
import Abundance from './Resources/AbundanceVolcano/abundance'
import * as utils from './Resources/AbundanceVolcano/utils.js'

let genes = utils.getGenes()

const Content = ({ title }) => {
    const [currentGene, setCurrentGene] = React.useState(genes[0])  // TODO: Just tagging that this is where the initial gene is set

    // For Dropdown in Abundance

    const handleGeneChange = (gene) => {
        setCurrentGene(gene)
    }

    return (
      <div className="lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

        {/* Just Text */}
        <div className="flex justify-between text-white items-center mb-8">
          <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>{title}</p>
        </div>

        <div className="flex flex-wrap">
          <div className="p-4 rounded-3xl bg-gray-300">

            {/* Abundance */}
            <div className="p-7 bg-white rounded-3xl">
              <Volcano changeAbundanceGene={handleGeneChange}/>
            </div>

            <div className="p-1">
            </div>

            <div className="p-7 bg-white rounded-3xl">
              <Abundance currentGene={currentGene}/>
            </div>

          </div>

          <div className="p-7 bg-white rounded-3xl">
            <CommentBox />
          </div>
        </div>
      </div>
    )
};

console.log('Up and running!')
export default Content;
