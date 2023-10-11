import HomeIcon from './icons/home';
import StatusIcon from './icons/status';
import CreditsIcon from './icons/credits';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';

import * as icons from './icons/iconParty'
//import DisclaimerIcon from './icons/Disclaimer'
//import CellAbundanceIcon from './icons/CellAbundance'

const data = [
  {
    title: 'Disclaimer',
    icon: <icons.DisclaimerIcon />,
    link: '/Disclaimer',
  },
  {
    title: 'Overview',
    icon: <icons.OverviewIcon />,
    link: '/Overview',
  },
  {
    title: 'CellAbundance',
    icon: <icons.CellAbundanceIcon />,
    link: '/CellAbundance',
  },
  {  
    /* AbundanceVolcano */
    title: 'GeneAbundance',
    icon: <icons.GeneAbundanceIcon />,
    link: '/GeneAbundance',
  },
  {
    title: 'Glossary',
    icon: <icons.GlossaryIcon />,
    link: '/Glossary',
  },
/*  
  {
    title: 'CallToAction',
    icon: <icons.CallToActionIcon />,
    link: '/NextSteps',
  },
*/
];

export default data;
