import React from "react"
import CommentBox from './comment_box'

import *  as CommonUtils from './CommonUtils'
import Volcano from './Resources/GeneAbundance/volcano'
import Abundance from './Resources/GeneAbundance/abundance'
import * as utils from './Resources/GeneAbundance/utils.js'

const BlopIconPath = CommonUtils.dataPath + "/GeneAbundance/Blop.png"
let genes = utils.getGenes()


const GeneAbundance = ({ title }) => {
    const [currentGene, setCurrentGene] = React.useState(genes[0])  
    console.log('GeneAbundance: ' + currentGene)

    return (
        <div className="flex">
            <div className="bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

                {/* Just Text */}
                <div className="flex justify-between text-white items-center mb-4">
                    <p style={{fontFamily: "Space Grotesk"}} className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>{title}</p>
                </div>

                <div className="flex flex-wrap">
                    {/* Abundance and Volcano in here */}
                    <div className="p-4 rounded-3xl bg-gray-300">
                        {/* Volcano */}
                        <div className="p-6 bg-white rounded-3xl outsideVolcano">
                            <Volcano changeAbundanceGene={setCurrentGene}/>
                        </div>

                        <div className="p-1.5">
                        </div>

                        {/* Abundance */}
                        <div className="p-6 bg-white rounded-3xl">
                            <Abundance currentGene={currentGene} setCurrentGene={setCurrentGene}/>
                        </div>
                    </div>

                    <CommentBox />
                </div>
            </div>

            {/* The side items */}
            <div className="bg-gray-900 py-6 rounded-3xl ml-8" style={{ width: '500px', minWidth: '500px' }}>

                {/* Just padding */}
                <div className="py-4 flex justify-between text-white items-center mb-8">
                </div>

                <div className="flex mb-1 p-4 rounded-3xl bg-gray-300">
                    <div className="flex-grow bg-gray-800 rounded-3xl px-4 pt-6">
                        <div className="flex text-white font-medium pb-1">
                            Volcano Plot
                        </div>
                        <div>
                            <div className="border-t solid border-gray-700 p-2 flex 2xl:items-start w-full ">
                                <div style={{ width: "150px", height: "150px" }}>
                                    <img
                                        src={`${CommonUtils.dataPath}/GeneAbundance/Blop.png`}
                                        alt="Our mascot, Blop"
                                    />
                                </div>

                                <div className="pl-4 w-full">
                                    <p style={{fontFamily: "Space Grotesk"}} className="my-2 text-sm text-gray-400">
                                        In this view you can explore gene expression signatures in the different immune cell types.
                                    </p>
                                    <p style={{fontFamily: "Space Grotesk"}} className="my-2 text-sm text-gray-400">
                                        Genes to the left of the y-axis are less present in your cells compared to other people in ImYoo’s database, and genes to the right of the y-axis are more present compared to other people. 
                                    </p>
                                    <p style={{fontFamily: "Space Grotesk"}} className="my-2 text-sm text-gray-400">
                                        To select a cell type, use the drop-down menu. 
                                        Hover over a point to see the name of the gene.
                                        To get information about a gene, click on its point. 
                                        To zoom in, click and drag to select an area. 
                                        To zoom out, double click anywhere on the plot. 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex h-1/3 p-4 rounded-3xl bg-gray-300 transform translate-y-100">
                    <div className="flex-grow bg-gray-800 rounded-3xl px-4 pt-6">
                        <div className="flex text-white font-medium pb-2">
                            Gene Abundance
                        </div>
                        <div>
                            <div className="border-t solid border-gray-700 p-2 flex 2xl:items-start w-full">
                                <div style={{ width: "150px", height: "100px" }}>
                                    <img
                                        src={`${CommonUtils.dataPath}/GeneAbundance/Blop.png`}
                                        alt="Our mascot, Blop"
                                    />
                                </div>

                                <div className="pl-4 w-full">
                                    <p style={{fontFamily: "Space Grotesk"}} className="mb-2 text-sm text-gray-400">
                                        In this view you can explore how much of a gene is expressed in various cell types. Below is a boxplot showing your average gene expression of selected in gene in specific cell type compared to those of other participants. 
                                    </p>
                                    <p style={{fontFamily: "Space Grotesk"}} className="my-2 text-sm text-gray-400">
                                        Use the dropdown to browse genes. 
                                        To search for a specific gene, type its name into the dropdown. 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

console.log('Up and running!')
export default GeneAbundance;
