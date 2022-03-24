import React from 'react'

import Dialogs from './app/Dialogs/Dialogs'
import FilterableProductTable from './app/FilterableProductTable/FilterableProductTable'
import Hooks from './app/Hooks/Hooks'
import Calculator from './app/TemperatureCalculator/Calculator'
import Game from './app/TicTacToe/Game'

import { PRODUCTS } from './app/FilterableProductTable/Constant'

import './App.scss'

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
        <br />
        <Calculator />
        <br />
        <Dialogs />
        <br />
        <FilterableProductTable products={PRODUCTS} />
        <br />
        <Hooks />
      </div>
    )
  }
}

export default App
