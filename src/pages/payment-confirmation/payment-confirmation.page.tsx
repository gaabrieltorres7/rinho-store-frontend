import { FC, useContext, useEffect } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineHome } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header.component'
import { CartContext } from '../../contexts/cart.context'
import Colors from '../../theme/theme.colors'
import { PaymentConfirmationContainer, PaymentConfirmationContent } from './payment-confirmation.styles'

const PaymentConfirmationPage: FC = () => {
  const { clearProducts } = useContext(CartContext)
  const [searchParams] = useSearchParams()
  const status = searchParams.get('success')

  const navigate = useNavigate()
  const handleGoToHome = () => {
    navigate('/')
  }

  useEffect(() => {
    if (status === 'true') clearProducts()
  }, [status])

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' ? (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.success} />
              <h1>Pagamento realizado com sucesso!</h1>
              <p>Seu pagamento foi realizado com sucesso! Obrigado por comprar conosco!</p>
            </>
          ) : (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <h1>Pagamento não realizado</h1>
              <p>Seu pagamento não foi realizado. Por favor, tente novamente.</p>
            </>)}
            <CustomButton onClick={handleGoToHome} startIcon={<AiOutlineHome />}>Ir para a Página Inicial</CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  )
}

export default PaymentConfirmationPage
