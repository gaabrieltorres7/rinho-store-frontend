import React, { FC, createContext, useState } from 'react'
import CartProduct from '../types/cart.types'

interface ICartContext {
  isVisible: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}

const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {}
})

interface CartContextProviderProps {
  children: React.ReactNode
}

const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible(prevState => !prevState)
  }

  return (
    <CartContext.Provider value={{
      isVisible,
      products,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
