import { FC } from 'react'
import Product from '../../types/products.types'
import { ProductContainer, ProductImage, ProductInfo } from './product-item.styles'

interface ProductItemProps {
  product: Product
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl} />
        <ProductInfo>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
