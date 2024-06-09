import { FunctionComponent, useContext, useState } from 'react'
import { BsBagCheck } from 'react-icons/bs'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'

import axios from 'axios'
import { CartContext } from '../../contexts/cart.context'
import Loading from '../loading/loading.component'
import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal
} from './checkout.styles'

const Checkout: FunctionComponent = () => {
  const { products, productsTotalPrice } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false)

  // 4242424242
  const handleFinishPurchase = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL!}create-checkout-session`, { products })
      window.location.href = data.url
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CheckoutContainer>
        {isLoading && <Loading message='Finalizando compra...' />}
        <CheckoutTitle>Checkout</CheckoutTitle>

        {products.length > 0 ? (
          <>
            <CheckoutProducts>
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </CheckoutProducts>

            <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>

            <CustomButton onClick={handleFinishPurchase} startIcon={<BsBagCheck />}>
              Finalizar Compra
            </CustomButton>
          </>
        ) : (
          <p>Seu carrinho está vazio!</p>
        )}
      </CheckoutContainer>
    </>
  )
}

export default Checkout
