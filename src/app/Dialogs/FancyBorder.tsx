import React, { ReactNode } from 'react'

import './FancyBorder.scss'

export interface Props {
  color: string
  children?: ReactNode
}

function FancyBorder(props: Props) {
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  )
}

export default FancyBorder
