import React, { ChangeEvent } from 'react'

interface Props {
  filterText: string
  inStockOnly: boolean
  onFilterTextChange: (value: string) => void
  onInStockChange: (checked: boolean) => void
}

class SearchBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.onFilterTextChange(e.target.value)
  }

  handleInStockChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.onInStockChange(e.target.checked)
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <label>
            <input
              type="checkbox"
              checked={this.props.inStockOnly}
              onChange={this.handleInStockChange}
            />{' '}
            Only show products in stock
          </label>
        </p>
      </form>
    )
  }
}

export default SearchBar
