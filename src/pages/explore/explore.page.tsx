import { FC } from 'react'
import CategoriesOverview from '../../components/categories-overview/categories-overview.component'
import Header from '../../components/header/header.component'

const ExplorePage: FC = () => {
  return (
    <>
      <Header />
      <CategoriesOverview />
    </>
  )
}

export default ExplorePage
