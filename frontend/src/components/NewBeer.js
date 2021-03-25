import axios from 'axios'
import React, { useState } from 'react'

const NewBeer = (props) => {

  const [newBeer, updateNewBeer] = useState({
    name: '',
    abv: '',
    description: '',
    image: '',
    keg_size: '',
    keg_price: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...newBeer,
      [name]: value
    }
    updateNewBeer(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.post('/api/beers/', newBeer, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/beers')
      })
  }

  return <>
    <div className="new-beer">
      <h1>Add Beer</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name:</label>
          <input type="text" className="input" placeholder="Name" name="name" value={newBeer.name} onChange={handleChange}/>
        </div>
        <div className="field">
          <label className="label">Abv:</label>
          <input type="text" className="input" placeholder="Abv" name="abv" value={newBeer.abv} onChange={handleChange}/>
        </div>
        <div className="field">
          <label className="label">Image:</label>
          <input type="text" className="input" placeholder="Image url" name="image" value={newBeer.image} onChange={handleChange}/>
        </div>
        <div className="field">
          <label className="label">Keg Size:</label>
          <input type="text" className="input" placeholder="Keg size" name="keg_size" value={newBeer.keg_size} onChange={handleChange}/>
        </div>
        <div className="field">
          <label className="label">Keg Price:</label>
          <input type="text" className="input" placeholder="Keg Price" name="keg_price" value={newBeer.keg_price} onChange={handleChange}/>
        </div>
        <div className="field">
          <label className="label">Description:</label>
          <textarea className="textarea" placeholder="Description" name="description" value={newBeer.description} onChange={handleChange}></textarea>
        </div>
        <div className="submit-button">
          <button className="button is-black">Submit</button>
        </div>
      </form>
    </div>
  </>

}

export default NewBeer