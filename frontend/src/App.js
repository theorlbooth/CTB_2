import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import '../styles/reset.css'
import '../styles/styles.scss'

import bulma from 'bulma'

import Navbar from './components/Navbar'
import Beers from './components/Beers'
import NewBeer from './components/NewBeer'
import Login from './components/Login'

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/beers" component={Beers}></Route>
        <Route exact path="/beers/new" component={NewBeer}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  </>
}


export default App