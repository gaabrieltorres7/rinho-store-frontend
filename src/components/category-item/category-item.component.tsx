import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Category from '../../types/category.types'
import { CategoryItemContainer, CategoryName } from './category-item.styles'

interface CategoryItemProps {
  category: Category
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const navigate = useNavigate()
  const handleExploreClick = () => {
    navigate(`/category/${category.id}`)
  }

  return (
    <CategoryItemContainer backgroundImage={category.imageUrl}>
      <CategoryName onClick={handleExploreClick}>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  )
}

export default CategoryItem
