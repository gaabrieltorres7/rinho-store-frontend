import axios from 'axios'
import { useEffect, useState } from 'react'
import env from '../../config/env.config'
import Category from '../../types/category.types'
import CategoryItem from '../category-item/category-item.component'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import './categories.styles.css'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  console.log({ categories })

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}api/category`)
      setCategories(data)
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
