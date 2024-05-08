import React, { FC, createContext, useMemo, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/products.types'

interface ICartContext {
  isVisible: boolean
  productsTotalPrice: number
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  decreaseProductQuantity: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  products: [],
  toggleCart: () => { },
  addProductToCart: () => { },
  removeProductFromCart: () => { },
  increaseProductQuantity: () => { },
  decreaseProductQuantity: () => { }
})

interface CartContextProviderProps {
  children: React.ReactNode
}

export const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)
  }, [products])

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

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    )
  }

  return (
    <CartContext.Provider value={{
      isVisible,
      products,
      productsTotalPrice,
      toggleCart,
      addProductToCart,
      removeProductFromCart,
      increaseProductQuantity,
      decreaseProductQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
