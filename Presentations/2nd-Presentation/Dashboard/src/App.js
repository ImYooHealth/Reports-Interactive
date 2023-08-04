import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DashboardLayout from './dashboard/layout';

import HomePage from './pages';
import StatusPage from './pages/status';
import CreditsPage from './pages/credits';
import ArchivesPage from './pages/archives';
import SettingsPage from './pages/settings';
import DocumentationPage from './pages/documentation';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Switch>

          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/archives">
            <ArchivesPage />
          </Route>
          <Route exact path="/credits">
            <CreditsPage />
          </Route>
          <Route exact path="/documentation">
            <DocumentationPage />
          </Route>
          <Route exact path="/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/status">
            <StatusPage />
          </Route>


        </Switch>
      </DashboardLayout>
    </Router>
  );
}

export default App;
