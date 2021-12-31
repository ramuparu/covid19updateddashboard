import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Vaccination from './components/Vaccination'
import SearchCovidCasesByIndividualStates from './components/SearchCovidCasesByIndividualStates'
import './App.css'

const App = () => (
  <div className="corona_main_page">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />

      <Route
        exact
        path="/state/:stateCode"
        component={SearchCovidCasesByIndividualStates}
      />
      <Route exact path="/vaccination" component={Vaccination} />
      <Route exact path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
