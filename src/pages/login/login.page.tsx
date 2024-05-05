import { AuthError, AuthErrorCodes, signInWithEmailAndPassword } from '@firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { isEmail } from 'validator'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import { auth, db, googleProvider } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormData>()

  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async ({ email, password }: LoginFormData) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      console.log({ userCredentials })
    } catch (error) {
      const _error = error as AuthError
      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setError('password', { type: 'invalidCredentials' })
        setError('email', { type: 'invalidCredentials' })
      }
    }
  }

  const handleSignInWithGooglePress = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider)
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('id', '==', userCredentials.user.uid)))
      const user = querySnapshot.docs[0]?.data()
      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0]
        const lastName = userCredentials.user.displayName?.split(' ')[1]
        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: 'google'
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />} onClick={handleSignInWithGooglePress}>
            Entrar com o google
          </CustomButton>

          <LoginSubtitle>ou entre com seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder='Digite seu e-mail'
              {...register('email', {
                required: true,
                validate: (value) => {
                  return isEmail(value)
                }
              })}
            />
            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O email é obrigatório</InputErrorMessage>
            )}
            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>Insira um email válido</InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              type='password'
              hasError={!!errors?.password}
              placeholder='Digite sua senha'
              {...register('password', { required: true })}
            />
            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
            {(errors?.password?.type === 'invalidCredentials' || errors?.email?.type === 'invalidCredentials') && (
              <InputErrorMessage>Senha ou email incorretos</InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
