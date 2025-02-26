import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'

import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'

const CheckoutPage: React.FC = () => {
    const { single_product } = useProductsContext();
  const { cart } = useCartContext()
  return (
    <main>
      <PageHero title='checkout' product={single_product}/>
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>your cart is empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`
export default CheckoutPage
