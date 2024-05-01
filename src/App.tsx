import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from './config/firebase.config'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

const App = () => {
  onAuthStateChanged(auth, (user) => {
    console.log({ user })
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
