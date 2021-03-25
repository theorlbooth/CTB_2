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




{/* <div className="beer-columns" style={{ backgroundColor: 'red', padding: '6% 3% 3% 3%', height: '100vh' }}>
      <div className="columns is-multiline is-mobile is-centered">
        {beers.map((beer, index) => {
          return <div className="column is-3-desktop is-6-tablet is-12-mobile" key={index}>
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src={beer.image} alt={beer.name} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="media-left">
                    <h1 className="title">{beer.name}</h1>
                  </div>
                  <div className="media-right">
                    <h2 className="title">{beer.abv}%</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </div> */}