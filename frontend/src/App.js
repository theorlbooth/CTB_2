import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import '../styles/reset.css'
import '../styles/styles.scss'

import bulma from 'bulma'

import Navbar from './components/Navbar'
import Beers from './components/Beers'
import NewBeer from './components/NewBeer'
import Login from './components/Login'
import Home from './components/Home'
import NewSale from './components/NewSale'
import Sales from './components/Sales'
import Charts from './components/Charts'

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/beers" component={Beers}></Route>
        <Route exact path="/beers/new" component={NewBeer}></Route>
        <Route exact path="/newsale" component={NewSale}></Route>
        <Route exact path="/sales" component={Sales}></Route>
        <Route exact path="/charts" component={Charts}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  </>
}


export default App