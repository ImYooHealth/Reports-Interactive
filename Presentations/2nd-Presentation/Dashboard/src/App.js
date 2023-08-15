import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DashboardLayout from './dashboard/layout';

import HomePage from './pages';
import StatusPage from './pages/status';
import CreditsPage from './pages/credits';
import ArchivesPage from './pages/archives';
import SettingsPage from './pages/settings';
import DocumentationPage from './pages/documentation';

import LoginPage from './pages/Login';
import DisclaimerPage from './pages/Disclaimer';
import GlossaryPage from './pages/Glossary'
import OverviewPage from './pages/Overview';
import CellAbundancePage from './pages/CellAbundance'
import GeneAbundancePage from './pages/GeneAbundance'

import CallToActionPage from './pages/CallToAction'

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Switch>

          <Route path="/ExperimentalScratchpad">
            <ArchivesPage />
          </Route>

          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/Disclaimer">
            <DisclaimerPage />
          </Route>
          <Route exact path="/Overview">
            <OverviewPage />
          </Route>
          <Route exact path="/CellAbundance">
            <CellAbundancePage />
          </Route>
          <Route exact path="/GeneAbundance">
            <GeneAbundancePage />
          </Route>
          <Route exact path="/Glossary">
            <GlossaryPage />
          </Route>
          <Route exact path="/NextSteps">
            <CallToActionPage />
          </Route>

        </Switch>
      </DashboardLayout>
    </Router>
  );
}

export default App;
