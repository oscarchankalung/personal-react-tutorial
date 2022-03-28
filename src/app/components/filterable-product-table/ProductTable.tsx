import React, { ReactNode } from 'react'
import { Product } from './FilterableProductTable'

import './ProductTable.scss'

function ProductCategoryRow(props: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{props.category}</th>
    </tr>
  )
}

function ProductRow(props: { product: Product }) {
  const { name, price, stocked } = props.product
  return (
    <tr>
      <td style={{ color: stocked ? 'black' : 'red' }}>{name}</td>
      <td>{price}</td>
    </tr>
  )
}

interface Props {
  products: Product[]
  filterText: string
  inStockOnly: boolean
}

class ProductTable extends React.Component<Props> {
  render() {
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly

    const rows: ReactNode[] = []
    let lastCategory: string | null = null

    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return
      }
      if (inStockOnly && !product.stocked) {
        return
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        )
      }
      rows.push(<ProductRow product={product} key={product.name} />)
      lastCategory = product.category
    })

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default ProductTable
