import React from 'react'

export type SquareValue = 'X' | 'O' | null

export interface Props {
  value: SquareValue
  onClick: () => void
  isWinning: boolean
}

function Square(props: Props): JSX.Element {
  return (
    <button
      className={'square' + (props.isWinning ? ' square-winning' : '')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

export default Square
