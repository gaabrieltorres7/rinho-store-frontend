import { FC } from 'react'
import Category from '../../types/category.types'
import { CategoryItemContainer, CategoryName } from './category-item.styles'
import './category-item.styles.css'

interface CategoryItemProps {
  category: Category
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  return (
    <CategoryItemContainer backgroundImage={category.imageUrl}>
      <CategoryName>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  )
}

export default CategoryItem
