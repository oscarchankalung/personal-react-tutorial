import React, { ChangeEvent } from 'react'
import { Scale } from './Calculator'

interface Props {
  scale: Scale
  temperature: string
  onTemperatureChange: (temperature: string, scale: Scale) => void
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fanhreheit',
}

class TemperatureInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.onTemperatureChange(e.target.value, this.props.scale)
  }

  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

export default TemperatureInput
