import React, { ReactNode } from 'react'
import FancyBorder from './FancyBorder'

export interface Props {
  title: string
  message: string
  children?: ReactNode
}

function Dialog(props: Props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  )
}

export default Dialog
