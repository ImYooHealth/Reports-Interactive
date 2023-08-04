import HomeIcon from './icons/home';
import StatusIcon from './icons/status';
import CreditsIcon from './icons/credits';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Status',
    icon: <StatusIcon />,
    link: '/status',
  },
  {
    title: 'Archives',
    icon: <ArchivesIcon />,
    link: '/archives',
  },
  {
    title: 'Credits',
    icon: <CreditsIcon />,
    link: '/credits',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/settings',
  },
  {
    title: 'Documentation',
    icon: <DocumentationIcon />,
    link: '/documentation',
  },
];

export default data;
