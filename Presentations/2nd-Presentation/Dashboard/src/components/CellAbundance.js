import React from "react"
import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/CellAbundance/utils.js'
import Abundance from './Resources/CellAbundance/abundance'
import Volcano from './Resources/CellAbundance/volcano'

let genes = utils.getGenes()


const CellAbundance = ({title}) => { 
    const [currentGene, setCurrentGene] = React.useState(genes[0])  // TODO: Just tagging that this is where the initial gene is set

    const handleGeneChange = (gene) => {
        setCurrentGene(gene)
    }

    return (
        <commonUtils.CellAbundanceSpecificOverhead title="Cell Abundance">
            {/* 
            https://www.notion.so/imyoo/67083843abdc47b0b73fcee1e0471c47?v=8ae7653fd3a44bfdb2d2e90d084f6c8f&p=df52504933eb4fe68d290c2b27d8bf78&pm=s
            */}
            <div style={{display: 'none'}}>
                <Volcano changeAbundanceGene={handleGeneChange}/>
            </div>
                                        
            <Abundance currentGene={currentGene} handleGeneChange={handleGeneChange}/>
        </commonUtils.CellAbundanceSpecificOverhead>
    )
}

export default CellAbundance;