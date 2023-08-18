import React from "react"
import CommentBox from './comment_box'

import Volcano from './Resources/AbundanceVolcano/volcano'
import Abundance from './Resources/AbundanceVolcano/abundance'
import * as utils from './Resources/AbundanceVolcano/utils.js'

let genes = utils.getGenes()


const adjustment = {
    transform: 'translateY(0px)', /* Shift the element vertically by 50 pixels */
}

const heights = {
    height: '100px',
}

const GeneAbundance = ({ title }) => {
    const [currentGene, setCurrentGene] = React.useState(genes[0])  // TODO: Just tagging that this is where the initial gene is set

    // For Dropdown in Abundance
    const handleGeneChange = (gene) => {
        setCurrentGene(gene)
    }

    return (
        <div className="flex">
            <div className="bg-gray-800 py-6 px-6 rounded-3xl min-w-min max-w-min">

                {/* Just Text */}
                <div className="flex justify-between text-white items-center mb-4">
                    <p className="text-2xl font-bold" style={{fontFamily: "Space Grotesk"}}>{title}</p>
                </div>

                <div className="flex flex-wrap">
                    {/* Abundance and Volcano in here */}
                    <div className="p-4 rounded-3xl bg-gray-300">
                        {/* Volcano */}
                        <div className="p-6 bg-white rounded-3xl outsideVolcano">
                            <Volcano changeAbundanceGene={handleGeneChange}/>
                        </div>

                        <div className="p-1.5">
                        </div>

                        {/* Abundance */}
                        <div className="p-6 bg-white rounded-3xl">
                            <Abundance currentGene={currentGene}/>
                        </div>
                    </div>

                    <CommentBox />
                </div>
            </div>

            {/* The side items */}
            <div className="bg-gray-900 py-6 rounded-3xl w-full ml-8 lg:w-4/12">

                {/* Just padding */}
                <div className="py-4 flex justify-between text-white items-center mb-8">
                </div>

                <div className="flex h-1/3 mb-1 p-4 rounded-3xl bg-gray-300">
                    <div className="flex-grow bg-gray-800 rounded-3xl px-6 pt-6">
                        <div className="flex text-white font-medium pb-6">
                            Gene Abundance
                        </div>
                        <div>
                            <div className="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Monocytes%2C_a_type_of_white_blood_cell_%28Giemsa_stained%29.jpg/640px-Monocytes%2C_a_type_of_white_blood_cell_%28Giemsa_stained%29.jpg"
                                    alt="profile image"
                                    className="object-cover w-10 h-10 rounded-full"
                                />
                                <div className="pl-4 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-white font-medium">Title</div>
                                        <div className="flex justify-center items-center cursor-pointer h-7 w-7">
                                        </div>
                                    </div>
                                    <p className="my-2 text-sm text-gray-400">
                                        Description of gene abundance
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* absolute top-0 left-20 px-50 w-200 h-100 */}

                {/* Just padding */}
                <div className="p-2 flex justify-between text-white items-center">
                </div>

                <div className="mt-20 flex h-1/3 p-4 rounded-3xl bg-gray-300 transform translate-y-100">
                    <div className="flex-grow bg-gray-800 rounded-3xl px-6 pt-6">
                        <div className="flex text-white font-medium pb-6">
                            Gene Abundance
                        </div>
                        <div>
                            <div className="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Monocytes%2C_a_type_of_white_blood_cell_%28Giemsa_stained%29.jpg/640px-Monocytes%2C_a_type_of_white_blood_cell_%28Giemsa_stained%29.jpg"
                                    alt="profile image"
                                    className="object-cover w-10 h-10 rounded-full"
                                />
                                <div className="pl-4 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-white font-medium">Title</div>
                                        <div className="flex justify-center items-center cursor-pointer h-7 w-7">
                                        </div>
                                    </div>
                                    <p className="my-2 text-sm text-gray-400">
                                        Description of gene abundance
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
