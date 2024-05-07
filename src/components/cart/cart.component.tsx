import { FC, useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'
import { CartContainer, CartContent, CartEscapeArea, CartTitle, CartTotal } from './cart.styles'

const Cart: FC = () => {
  const { isVisible, toggleCart, products } = useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart}/>
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map(product => (
          <CartItem key={product.id} product={product} />
        ))}

        <CartTotal>Total: R$ 0,00</CartTotal>
        <CustomButton startIcon={<BsCartCheck />}>Ir para o Checkout</CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart
