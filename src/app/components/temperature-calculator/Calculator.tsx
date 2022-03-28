import React from 'react'
import BoilingVerdict from './BoilingVerdict'
import TemperatureInput from './TemperatureInput'
import { tryConvert, toCelsius, toFahrenheit } from './Helpers'

export type Scale = 'c' | 'f'

interface State {
  temperature: string
  scale: Scale
}

class Calculator extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props)
    this.state = { temperature: '', scale: 'c' }
    this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
  }

  handleTemperatureChange(temperature: string, scale: Scale) {
    this.setState({ temperature, scale })
  }

  render() {
    const scale = this.state.scale
    const temp = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temp, toCelsius) : temp
    const fahrenheit = scale === 'c' ? tryConvert(temp, toFahrenheit) : temp

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleTemperatureChange}
        />
        <br />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleTemperatureChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    )
  }
}

export default Calculator
