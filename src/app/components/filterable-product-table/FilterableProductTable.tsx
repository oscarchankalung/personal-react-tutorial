import React from 'react'
import ProductTable from './ProductTable'
import SearchBar from './SearchBar'

export interface Product {
  category: string
  price: string
  stocked: boolean
  name: string
}

export const PRODUCTS: Product[] = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
]

interface State {
  filterText: string
  inStockOnly: boolean
}

class FilterableProductTable extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props)
    this.state = {
      filterText: '',
      inStockOnly: false,
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this)
  }

  handleFilterTextChange(filterText: string) {
    this.setState({ filterText })
  }

  handleStockOnlyChange(inStockOnly: boolean) {
    this.setState({ inStockOnly: inStockOnly })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleStockOnlyChange}
        />
        <ProductTable
          products={PRODUCTS}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
}

export default FilterableProductTable
