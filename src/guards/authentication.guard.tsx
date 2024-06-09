import { FC, ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/header.component'
import Loading from '../components/loading/loading.component'
import { UserContext } from '../contexts/user.context'

interface AuthenticationGuardProps {
  children?: ReactNode
}

const AuthenticationGuard: FC<AuthenticationGuardProps> = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <>
      <Header />
      < Loading message = 'Você precisa estar logado para acessar essa página. Você será redirecionado para a página de Login em instantes' />
        </>
  }

  return children
}

export default AuthenticationGuard
