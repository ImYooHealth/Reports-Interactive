import Disclaimer from '../components/Disclaimer.js'

export default function DisclaimerPage({onVisit, hasVisitedDisclaimer}) {
  return <Disclaimer onVisit={onVisit} hasVisitedDisclaimer={hasVisitedDisclaimer}/>;
}
