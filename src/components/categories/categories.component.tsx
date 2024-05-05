import { useContext, useEffect } from 'react'
import { CategoryContext } from '../../contexts/category.context'
import CategoryItem from '../category-item/category-item.component'
import Loading from '../loading/loading.component'
import { CategoriesContainer, CategoriesContent } from './categories.styles'

const Categories = () => {
  const { categories, fetchCategories, isLoading } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map(category =>
        <div key={category.id}>
          <CategoryItem category={category} />
        </div>
        )}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
