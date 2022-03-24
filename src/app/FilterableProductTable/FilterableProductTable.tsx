import React from 'react'
import ProductTable from './ProductTable'
import SearchBar from './SearchBar'

import { Product } from './Constant'

interface Props {
  products: Product[]
}

interface State {
  filterText: string
  inStockOnly: boolean
}

class FilterableProductTable extends React.Component<Props, State> {
  constructor(props: any) {
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
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
}

export default FilterableProductTable
