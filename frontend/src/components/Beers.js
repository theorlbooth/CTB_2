import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Beers = () => {

  const [beers, updateBeers] = useState([])

  useEffect(() => {
    axios.get('/api/beers/')
      .then(resp => {
        console.log(resp.data)
        updateBeers(resp.data)
      })
  }, [])

  if (beers.length === 0) {
    return <>
    </>
  }

  return <>
    <div className="beer-list">
      <div className="add-beer">
        <Link className="button is-black" to="/beers/new">+</Link>
      </div>
      {beers.map((beer, index) => {
        return <div className="beer-row" key={index}>
          <img className="beer-image" src={beer.image} alt={beer.name} />
          <div className="beer-info">
            <div className="beer-name">{beer.name}</div>
            <div className="beer-abv">{beer.abv}%</div>
          </div>
        </div>
      })}
      <div className="add-beer">
        <Link className="button is-black" to="/beers/new">+</Link>
      </div>
    </div>
  </>
}

export default Beers