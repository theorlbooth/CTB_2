import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = (props) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, updateErrors] = useState({})

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateErrors('')
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    axios.post('/api/auth/login/', formData)
      .then(resp => {
        if (resp.data.token === undefined) {
          updateErrors(resp.data.message)
        } else {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/home')
        }
      })
  }

  return <> 
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">E-mail:</label>
          <input className="input" type="text" placeholder="E-mail" name="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div className="field">
          <label className="label">Password:</label>
          <input className="input" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
        </div>
        <div className="submit-button">
          <button className="button is-black">Submit</button>
        </div>
      </form>
    </div>
  </>
}

export default Login