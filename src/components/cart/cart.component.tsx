import { FC, useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'
import CustomButton from '../custom-button/custom-button.component'
import { CartContainer, CartContent, CartEscapeArea, CartTitle, CartTotal } from './cart.styles'

const Cart: FC = () => {
  const { isVisible, toggleCart } = useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart}/>
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {/* Cart items will be here */}

        <CartTotal>Total: R$ 0,00</CartTotal>
        <CustomButton startIcon={<BsCartCheck />}>Ir para o Checkout</CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart
