import { FC } from 'react'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import CartProduct from '../../types/cart.types'
import { CartItemContainer, CartItemImage, CartItemInfo, CartItemQuantity, RemoveButton } from './cart-item.styles'

interface CartItemProps {
  product: CartProduct
}

const CartItem: FC<CartItemProps> = ({ product }) => {
  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />
      <CartItemInfo>
        <p>{product.name}</p>
        <p>R$ {product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} />
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton>
        <AiOutlineClose size={25} />
      </RemoveButton>

    </CartItemContainer>
  )
}

export default CartItem
