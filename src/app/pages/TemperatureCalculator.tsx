import React, { Fragment } from 'react'
import Calculator from '../components/temperature-calculator/Calculator'

const TemperatureCalculator: React.FC = () => {
  return (
    <Fragment>
      <h1>Lifting State Up: Temperature Calculator</h1>
      <ul>
        <li>Calculator</li>
        <ul>
          <li>TemperatureInput_Celsius</li>
          <li>TemperatureInput_Fahrenheit</li>
          <li>BoilingVerdict</li>
        </ul>
      </ul>
      <Calculator />
    </Fragment>
  )
}

export default TemperatureCalculator
