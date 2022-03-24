import React from 'react'

import Board from './Board'
import { SquareValue } from './Square'
import { calculateWinner } from './Helpers'

import './Game.scss'

type Location = number | null

interface History {
  squares: SquareValue[]
  location: Location[]
}

interface State {
  history: History[]
  stepNumber: number
  xIsNext: boolean
  orderIsAscending: boolean
}

class Game extends React.Component<unknown, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: Array(2).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      orderIsAscending: true,
    }
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    const row = Math.floor(i / 3)
    const col = i % 3
    const location = [row, col]
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    console.log(`${squares[i]} clicked (${location})`)

    this.setState(state => ({
      history: [...history, { squares, location }],
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    }))
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  toggleOrder() {
    this.setState(state => ({
      orderIsAscending: !state.orderIsAscending,
    }))
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    let status = ''
    if (winner) {
      status = `Winner: ${winner.player}`
    } else if (this.state.stepNumber === 9) {
      status = 'Draw'
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    const order = (
      <>
        Order: {this.state.orderIsAscending ? 'Aescending' : 'Descending'}
        <button className="order-toggle" onClick={() => this.toggleOrder()}>
          Toogle
        </button>
      </>
    )

    const movesClassName = this.state.orderIsAscending ? '' : 'reverse'
    const moves = history.map((step, move) => {
      const isCurrent = move === this.state.stepNumber
      const desc = move
        ? `Back to move #${move} (${step.location})`
        : 'Back to game start'

      return (
        <li key={move}>
          <button
            className={isCurrent ? 'bold' : ''}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningSquares={winner ? winner.line : []}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <div className="status">{order}</div>
          <ol className={movesClassName}>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default Game
