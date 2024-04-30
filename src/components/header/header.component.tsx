import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './header.styles'

const Header = () => {
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

  return (
    <HeaderContainer>
        <HeaderTitle onClick={handleHomeClick}>RINHO STORE</HeaderTitle>
        <HeaderItems>
          <HeaderItem>Explorar</HeaderItem>
          <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
          <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          <HeaderItem><BsCart3 size={25}/><p style={{ marginLeft: 4 }}>1</p></HeaderItem>
        </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
