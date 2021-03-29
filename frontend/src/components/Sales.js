import axios from 'axios'
import React, { useState, useEffect } from 'react'
import moment from 'moment'

const Sales = () => {

  const [sales, updateSales] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/sales/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateSales(resp.data.reverse())
      })
  }, [])

  if (sales.length === 0) {
    return <></>
  }

  return <>
    <div className="sales">
      <table className="table is-striped">
        <thead>
          <tr>
            <th className="has-text-centered">id</th>
            <th className="has-text-centered">Date</th>
            <th className="has-text-centered">Beer</th>
            <th className="has-text-centered">Customer</th>
            <th className="has-text-centered">No_Kegs</th>
            <th className="has-text-centered">$/Keg</th>
            <th className="has-text-centered">Notes</th>
          </tr>
        </thead>
        <tbody>

          {sales.map((sale, index) => {
            return <tr key={index}>
              <td className="has-text-centered">{sale.id}</td>
              <td className="has-text-centered">{moment(sale.date).format('DD MMM YY')}</td>
              <td className="has-text-centered">{sale.beer.name}</td>
              <td className="has-text-centered">{sale.customer}</td>
              <td className="has-text-centered">{sale.number_of_kegs}</td>
              <td className="has-text-centered">£ {sale.price_per_keg}</td>
              <td className="has-text-centered">{sale.notes}</td>
            </tr>

          })}

        </tbody>
      </table>
    </div>
  </>
}

export default Sales