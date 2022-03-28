import React, { Fragment } from 'react'
import FilterableProductTable from '../components/filterable-product-table/FilterableProductTable'

const Table: React.FC = () => {
  return (
    <Fragment>
      <h1>Thinking in React: Filterable Product Table</h1>
      <ul>
        <li>Step 1: Break The UI Into A Component Hierarchy</li>
        <li>Step 2: Build A Static Version in React</li>
        <li>Step 3: Identity The Minimal Representation of UI State</li>
        <li>Step 4: Identity Where Your State Should Live</li>
        <li>Step 5: Add Inverse Data Flow</li>
      </ul>
      <FilterableProductTable />
    </Fragment>
  )
}

export default Table
