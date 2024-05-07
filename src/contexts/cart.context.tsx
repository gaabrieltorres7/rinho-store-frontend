import React, { FC, createContext, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/products.types'

interface ICartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => { },
  addProductToCart: () => { },
  removeProductFromCart: () => { }
})

interface CartContextProviderProps {
  children: React.ReactNode
}

export const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible(prevState => !prevState)
  }

  const addProductToCart = (product: Product) => {
    const productIsAlreadyInCart = products.find(
      (item) => item.id === product.id
    )

    if (productIsAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }

    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((prevState) =>
      prevState.filter((item) => item.id !== productId)
    )
  }

  return (
    <CartContext.Provider value={{
      isVisible,
      products,
      toggleCart,
      addProductToCart,
      removeProductFromCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
