import { FC } from 'react'
import Category from '../../types/category.types'
import { CategoryContainer, CategoryTitle, ProductsContainer } from './category-overview.styles'

interface CategoryOverviewProps {
  category: Category
}

const CategoryOverview: FC<CategoryOverviewProps> = ({ category }) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>
      <ProductsContainer></ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
