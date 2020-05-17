import React, {useState, useEffect, useFetch, useMemo } from 'react';
import {Button, Form} from 'react-bootstrap'
import { Chart } from 'react-charts'

export default function MyChart () {

  const data = [
    {
      label: 'Sarja 1',
      data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    },
    {
      label: 'Series 2',
      data: [[0, 14], [1, 1], [2, 5], [3, 6], [4, 4]]
    },
    {
      label: 'Setti 3',
      data: [[0, 3], [1, 4], [2, 7], [3, 13], [4, 4]]
    },
    {
      label: 'Viimeinen',
      data: [[0, 1], [1, 2], [2, 1], [3, 2], [4, 1]]
    }
  ]

  const getSeriesStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease'
    }),
    []
  )
  const getDatumStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease'
    }),
    []
  )

  const axes = useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const series = useMemo(
    () => ({
      showPoints: true
    }),
    []
  )

  const calculateAverage = (a, b) => {
 
    let average = {data: []}

    for (let i = 0; i < a.data.length; i++) {
        average.data.push([a.data[i][0], (a.data[i][1] + b.data[i][1]) / 2])
    }
  
    return average
  }

  const getAverage = incoming => incoming.reduce((calculateAverage))

  const addAverage = (incoming) => {
    return {label : 'Average', data: getAverage(incoming).data}
  }

  const calc = (data, onlyYours, average) => {

    if (! onlyYours && ! average) {
      return data
    } else if (onlyYours && ! average) {
      return [data[0]]
    } else if (! onlyYours && average) {
      return data.concat([addAverage(data)])
    } else {return [data[0], addAverage(data)]}
  }

  const [onlyYours, setOnlyYours] = useState(false)
  const [average, setAverage] = useState(false)

  return (
    <div>
      <Form.Check
      value={!onlyYours}
        onChange={(e) => {setOnlyYours(e.target.checked)}}
        type={'checkBox'}
        label={'Show only yours'}
        id={'checkBox'}
      />
      <Form.Check
        value={!average}
        onChange= {e => {setAverage(e.target.checked) }}
        type={'checkBox'}
        label={'Include average'}
        id={'checkBox2'}
      />
      <div style={{
      width: '500px',
      height: '400px'
    }}> 
    <Chart 
    data={calc(data, onlyYours, average)}
    series={series} 
    axes={axes} 
    getSeriesStyle={getSeriesStyle}
    getDatumStyle={getDatumStyle}
    tooltip />
      
    </div>
  
    </div>)
}