import axios from 'axios'
import { useEffect, useState } from 'react'
import env from '../../config/env.config'
import Category from '../../types/category.types'
import CategoryItem from '../category-item/category-item.component'
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
    <div className='categories-container'>
      <div className='categories-content'>
        {categories.map(category =>
        <div key={category.id}>
          <CategoryItem category={category} />
        </div>
        )}
      </div>
    </div>
  )
}

export default Categories
