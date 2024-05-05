import { FC, useContext, useEffect } from 'react'
import { CategoryContext } from '../../contexts/category.context'
import CategoryOverview from '../category-overview/category-overview.component'
import { Container } from './categories-overview.styles'

const CategoriesOverview: FC = () => {
  const { categories, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    if (categories.length === 0) fetchCategories()
  }, [])

  return (
    <Container>
      {categories.map(category => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
