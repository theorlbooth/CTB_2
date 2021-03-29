import React, { useState, useEffect } from 'react'
import Chart from 'chart.js'
import axios from 'axios'

const Charts = () => {

  const [beers, updateBeers] = useState([])
  const [labels, updateLabels] = useState([])
  const [sales, updateSales] = useState([])
  const [kegs, updateKegs] = useState([])


  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/beers/all/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateBeers(resp.data)
        const labels = resp.data.map(beer => {
          return beer.name
        })
        updateLabels(labels)
        console.log(labels)
        const sales = resp.data.map(beer => {
          return beer.sales.length
        })
        updateSales(sales)
        console.log(sales)
        const running = []
        const kegs = resp.data.forEach(beer => {
          let count = 0
          beer.sales.forEach(sale => {
            count += sale.number_of_kegs
          })
          running.push(count)
          return running
        })
        updateKegs(kegs)
        console.log(kegs)
      })
  }, [])

  const beerChart = new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#3e95cd',
          data: [sales]
        }, {
          label: 'Kegs', 
          backgroundColor: '#8e5ea2',
          data: kegs
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Camden Sales v Kegs'
      }
    }
  })


  if (kegs === []) {
    return <></>
  }

  return <>
  <div className="chart">
    <canvas id="bar-chart" width="800" height="450"></canvas>
  </div>
  </>
}

export default Charts