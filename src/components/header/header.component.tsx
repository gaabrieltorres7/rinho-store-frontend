import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './header.styles'
import './header.styles.css'

const Header = () => {
  return (
    <HeaderContainer>
        <HeaderTitle>RINHO STORE</HeaderTitle>
        <HeaderItems>
          <HeaderItem>Explorar</HeaderItem>
          <HeaderItem>Login</HeaderItem>
          <HeaderItem>Criar Conta</HeaderItem>
          <HeaderItem><BsCart3 size={25}/><p style={{ marginLeft: 4 }}>1</p></HeaderItem>
        </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
