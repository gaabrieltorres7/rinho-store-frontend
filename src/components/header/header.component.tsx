import { signOut } from '@firebase/auth'
import { useContext } from 'react'
import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase.config'
import { CartContext } from '../../contexts/cart.context'
import { UserContext } from '../../contexts/user.context'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './header.styles'

const Header = () => {
  const { isAuthenticated } = useContext(UserContext)
  const { toggleCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleSignUpClick = () => {
    navigate('/signup')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleHomeClick}>RINHO STORE</HeaderTitle>
      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated &&
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        }
        {isAuthenticated &&
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        }
        <HeaderItem onClick={toggleCart}><BsCart3 size={25} /><p style={{ marginLeft: 4 }}>1</p></HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
