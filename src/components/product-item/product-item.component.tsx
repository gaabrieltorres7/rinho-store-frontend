import { FC, useContext } from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'
import Product from '../../types/products.types'
import CustomButton from '../custom-button/custom-button.component'
import { ProductContainer, ProductImage, ProductInfo } from './product-item.styles'

interface ProductItemProps {
  product: Product
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext)

  const handleAddProductToCart = () => {
    addProductToCart(product)
  }

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton onClick={handleAddProductToCart} startIcon={<BsCartPlus />}>Adicionar ao carrinho</CustomButton>
      </ProductImage>
        <ProductInfo>
          <p>{product.name}</p>
          <p>R$ {product.price}</p>
        </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
