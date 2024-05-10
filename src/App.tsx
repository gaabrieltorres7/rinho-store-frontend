import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import { onAuthStateChanged } from '@firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useState } from 'react'
import Cart from './components/cart/cart.component'
import Loading from './components/loading/loading.component'
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import { userConverter } from './converters/firestore.converters'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import CheckoutPage from './pages/checkout/checkout.page'
import ExplorePage from './pages/explore/explore.page'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user
    if (isSigningOut) {
      logoutUser()
      return setIsInitializing(false)
    }

    const isSigningIn = !isAuthenticated && user
    if (isSigningIn) {
      const querySnapshot = await getDocs(query(collection(db, 'users').withConverter(userConverter), where('id', '==', user.uid)))
      const userFromFirestore = querySnapshot.docs[0]?.data()
      loginUser(userFromFirestore)
      return setIsInitializing(false)
    }

    setIsInitializing(false)
  })

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/category/:id' element={<CategoryDetailsPage />} />
        <Route path='/checkout' element={<CheckoutPage /> } />
        <Route path='/login' element={<LoginPage /> } />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
      <Cart />
    </BrowserRouter>
  )
}

export default App
