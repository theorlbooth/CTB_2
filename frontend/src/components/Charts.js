import React, { useState, useEffect } from 'react'
import { Bar, Scatter } from 'react-chartjs-2'
import axios from 'axios'
import moment from 'moment'

const Charts = () => {

  const [beers, updateBeers] = useState([])
  const [labels, updateLabels] = useState([])
  const [sales, updateSales] = useState([])
  const [kegs, updateKegs] = useState([])
  const [lmtSales, updateLmtSales] = useState([])
  const [lmtDates, updateLmtDates] = useState([])
  const [lmtKegs, updateLmtKegs] = useState([])


  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get('/api/beers/all/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateBeers(data)
      console.log(data)

      const labels = data.map(beer => {
        return beer.name
      })
      updateLabels(labels)
      console.log(labels)

      const sales = data.map(beer => {
        return beer.sales.length
      })
      updateSales(sales)
      console.log(sales)

      const kegs = data.map(beer => {
        let count = 0
        beer.sales.forEach(sale => {
          count += sale.number_of_kegs
        })
        return count
      })
      updateKegs(kegs)
      console.log(kegs)

      const { data: lmtData } = await axios.get('/api/sales/lmt-view/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateLmtSales(lmtData)
      console.log(lmtData)

      const lmtDates = lmtData.map(date => {
        return moment(date.date, 'YYYY-MM-DD').unix() * 1000
      })
      updateLmtDates(lmtDates)
      console.log(lmtDates)

      const lmtKegs = lmtData.map(keg => {
        return keg.number_of_kegs
      })
      updateLmtKegs(lmtKegs)
      console.log(lmtKegs)
    }
    

    fetchData()
  }, [])



  const beerChart = {
    labels: labels,
    // labels: ['Hells', 'Pale', 'Off Menu IPA', 'Show Off Lager', 'Ink', 'Unfiltered Hells', 'Gentleman\'s Wit'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: sales
        // data: [12, 0, 5, 0, 0, 0, 1]
      }, {
        label: 'Kegs',
        backgroundColor: 'rgba(60,179,113,0.2)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: kegs
        // data: [320, 0, 50, 0, 0, 0, 1000]
      }
    ]
  }

  const timeChart = {
    labels: lmtDates,
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: lmtKegs
      }
    ]
  }

  if (labels.length === 0 || sales.length === 0 || kegs.length === 0) {
    return <></>
  }

  return <>
    <div className="bar-chart">
      <Bar data={beerChart}
        options={{
          title: {
            display: true,
            text: 'Sales v Kegs',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }} />
    </div>
    <div className="line-chart">
      <Scatter data={timeChart}
        options={{
          title: {
            display: true,
            text: 'Sales v Time',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: { 
                unit: 'week' }
            }]
          }
        }} />

    </div>
  </>
}

export default Charts