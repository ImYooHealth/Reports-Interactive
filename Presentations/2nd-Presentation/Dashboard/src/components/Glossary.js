import * as commonUtils from './commonUtils.js'
import * as utils from './Resources/Glossary/utils.js'

import ComponentsCollection from './newUiIdeas.js'

const glossaryText = `RNA - RNA is a small molecular messengers derived from DNA and is responsible for producing proteins in a cell
Gene - Gene is a portion of DNA containing instructions to make a certain protein or RNA molecule. They are turned and off throughout your lifetime and in exposure to internal and external events
Gene Expression - Gene expression is a process by which gene is used to create an end product, such as a protein or an RNA molecule. It consists of a gene segment being transcribed from DNA. Each gene is produced at different rates in different cells.
Red Blood Cell - Red blood cell is a cell whose main function is to carry oxygen from lungs to the rest of the body. This type of cell does not contain a nucleus. The hemoglobin protein produced by the cell gives it its red color.
White Blood Cell - White blood cells account for about 1 % of your blood. They are nucleated cells that are responsible for your body’s immune system. They fight infections and harmful invaders, and keep you in check against cancer. Some example of white blood cells include T cells, B cells, Natural Killer cells, and Monocytes.
Antigen - Antigen is a molecule which is recognized by the immune system as “non-self”. Antigens are present on surfaces of pathogens such as bacteria and viruses. They can also be present on cancerous or harmful cells.
Adaptive Immune System - The adaptive immune system is a specialized defense system that targets specific pathogens. When the adaptive immune system encounters a new pathogen, it creates unique cells and proteins called antibodies that can recognize and attack that specific pathogen. The adaptive immune system "learns" how to fight off that pathogen and creates a "memory" of it, so that if it encounters the same pathogen again in the future, it can mount a rapid and effective response.
Innate Immune System - The innate immune system is the body's first line of defense against invading pathogens like viruses and bacteria. The innate immune system is like a general defense system that responds to any kind of pathogen, but it doesn't differentiate between different types of pathogens.
Capillary Blood - Unlike venous blood, which can be collected from the arm and circulates through veins, capillary blood is found in small blood vessels in the bodies called capillaries.
Pathway - In biology, a pathway refers to a sequence of reactions done by collection of proteins. In order for a cell to present an antigen on its surface, numerous components have to work together to make that happen.
Single-cell RNA sequencing -Single-cell RNA sequencing is a biological technique used to measure gene expression profiles of individual cells. It captures the state of the cell by measuring thousands of genes in individual cells. It is a powerful research and discovery tool.
`

const Glossary = () => {
    return (
        <commonUtils.Overhead>
            <p>
                {utils.placeholder}
            </p>
            <ul>
                <li>
                    <p>
                        {glossaryText}
                    </p>
                </li>
            </ul>
        </commonUtils.Overhead>
    )
}

export default Glossary;