
import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import BusinessCart from '../../business/Cart'

const count = BusinessCart.count

class CartNavButton extends Component {
  constructor (props) {
    super(props)
    this.props = props
    this._cartCta = null
  }

  get cartCtaRef () {
    return this._cartCta
  }

  componentDidMount () {
    if (this.props.onSetCartCtaRef !== undefined) {
      console.log({ CartNavButton_didMount: this._cartCta })

      this.props.onSetCartCtaRef(this._cartCta)
    }
  }

  render () {
    return (
      <a id='cartCta' className='btn btn-success my-2 my-sm-0 ml-3' href='cart'>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span id='cartSum' className='badge badge-light ml-3' ref={(r) => { this._cartCta = r }}>{count}</span>
      </a>
    )
  }
}

export default CartNavButton