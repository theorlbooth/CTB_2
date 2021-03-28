import axios from 'axios'
import React, { useState, useEffect } from 'react'

const NewSale = (props) => {

  const [newSale, updateNewSale] = useState({
    date: '',
    beer: '',
    customer: '',
    number_of_kegs: '',
    price_per_keg: '',
    notes: ''
  })

  const [beers, updateBeers] = useState([])

  useEffect(() => {
    axios.get('/api/beers/')
      .then(resp => {
        console.log(resp.data)
        updateBeers(resp.data)
      })
  }, [])

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...newSale,
      [name]: value
    }
    updateNewSale(data)
    console.log(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.post('/api/sales/', newSale, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/sales')
      })
  }

  if (beers.length === 0) {
    return <>
    </>
  }

  return <>
    <div className="new-sale">
      <h1>New Sale</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Date:</label>
          <input type="date" className="input" name="date" value={newSale.date} onChange={handleChange}/>
        </div>
        <div className="field">
          <label className="label">Beer:</label>
          <select className="input" name="beer" id="beers" value={newSale.name} onChange={handleChange}>
            <option></option>
            {beers.map((beer, index) => {
              return <option key={index} value={beer.id}>{beer.name}</option>
            })}
          </select>
        </div>
        <div className="field">
          <label className="label">Customer:</label>
          <input type="text" className="input" placeholder="Customer" name="customer" value={newSale.customer} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label">Number of kegs:</label>
          <input type="text" className="input" placeholder="Number of kegs" name="number_of_kegs" value={newSale.number_of_kegs} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label">Price per keg:</label>
          <input type="text" className="input" placeholder="Price per keg" name="price_per_keg" value={newSale.price_per_keg} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label">Notes:</label>
          <textarea className="textarea" placeholder="Notes" name="notes" value={newSale.notes} onChange={handleChange}></textarea>
        </div>
        <div className="submit-button">
          <button className="button is-black">Submit</button>
        </div>
      </form>
    </div>
  </>
}

export default NewSale