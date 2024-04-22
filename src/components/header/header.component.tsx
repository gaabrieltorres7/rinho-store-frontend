import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer } from './header.style'
import './header.styles.css'

const Header = () => {
  return (
    <HeaderContainer>
        <h2 className="header-title">RINHO STORE</h2>
        <div className="header-items">
          <div className="header-item">Explorar</div>
          <div className="header-item">Login</div>
          <div className="header-item">Criar Conta</div>
          <div className="header-item"><BsCart3 size={25}/><p style={{ marginLeft: 4 }}>1</p></div>
        </div>
    </HeaderContainer>
  )
}

export default Header
