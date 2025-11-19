import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardLayout from './dashboard/layout';
import LoginPage from './pages/Login';
import DisclaimerPage from './pages/Disclaimer';
import GlossaryPage from './pages/Glossary'
import OverviewPage from './pages/Overview';
import CellAbundancePage from './pages/CellAbundance'
import GeneAbundancePage from './pages/GeneAbundance'

import *  as CommonUtils from './components/CommonUtils'

function App() {
                                                                     // TODO: Not a real todo. For dev, disable login by setting to True
    const [hasVisitedDisclaimer, setHasVisitedDisclaimer] = useState(!CommonUtils.deployed);

    const handleDisclaimerVisit = () => {
        setHasVisitedDisclaimer(true);
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LoginPage />
                </Route>

                {!hasVisitedDisclaimer ? (
                    <Route exact path="/Disclaimer">
                        <DisclaimerPage onVisit={handleDisclaimerVisit} hasVisitedDisclaimer={hasVisitedDisclaimer}/>
                    </Route>
                ) : (
                    <DashboardLayout>
                        <Route exact path="/Disclaimer">
                            <DisclaimerPage onVisit={handleDisclaimerVisit} hasVisitedDisclaimer={hasVisitedDisclaimer}/>
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
                    </DashboardLayout>
                )}
            </Switch>
        </Router>
    );
}

export default App;
