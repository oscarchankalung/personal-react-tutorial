import React from 'react'
import Square, { SquareValue } from './Square'

export interface Props {
  squares: SquareValue[]
  winningSquares: number[]
  onClick: (i: number) => void
}

class Board extends React.Component<Props> {
  renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinning={this.props.winningSquares.includes(i)}
      />
    )
  }

  render() {
    const squares = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]

    return (
      <div>
        {squares.map((row, index) => (
          <div key={index} className="board-row">
            {row.map(col => this.renderSquare(col))}
          </div>
        ))}
      </div>
    )
  }
}

export default Board
