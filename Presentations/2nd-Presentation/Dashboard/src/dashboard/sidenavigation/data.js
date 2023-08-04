import HomeIcon from './icons/home';
import StatusIcon from './icons/status';
import CreditsIcon from './icons/credits';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';

const data = [
  {
    title: 'Login',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Disclaimer',
    icon: <HomeIcon />,
    link: '/Disclaimer',
  },
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/HomePage',
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
