import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converters'
import Category from '../../types/category.types'
import CategoryItem from '../category-item/category-item.component'
import { CategoriesContainer, CategoriesContent } from './categories.styles'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  console.log({ categories })

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []
      const querySnapshot = await getDocs(collection(db, 'categories').withConverter(categoryConverter))
      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.error('Error fetching categories: ', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
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
