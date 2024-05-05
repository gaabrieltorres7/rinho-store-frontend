import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.component'
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer
} from './sign-up.styles'

import { FiLogIn } from 'react-icons/fi'

import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword } from '@firebase/auth'
import { addDoc, collection } from '@firebase/firestore'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { isEmail } from 'validator'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import { auth, db } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

interface SignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<SignUpFormData>()

  const handleSubmitPress = async ({ firstName, lastName, email, password }: SignUpFormData) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName,
        lastName,
        provider: 'firebase'
      })
    } catch (error) {
      const _error = error as AuthError
      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyInUse' })
      }
    }
  }

  const watchPassword = watch('password')

  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <>
      <Header />
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline> Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              hasError={!!errors?.firstName}
              placeholder='Digite seu nome'
              {...register('firstName', { required: true })}
            />
            {errors?.firstName?.type === 'required' && (
              <InputErrorMessage>O nome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              hasError={!!errors?.lastName}
              placeholder='Digite seu sobrenome'
              {...register('lastName', { required: true })}
            />
            {errors?.lastName?.type === 'required' && (
              <InputErrorMessage>O sobrenome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
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
            {errors?.email?.type === 'alreadyInUse' && (
              <InputErrorMessage>Este email já está em uso</InputErrorMessage>
            )}
            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>Insira um email válido</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder='Digite sua senha'
              type='password'
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage>A senha deve conter, no mínimo, 6 caracteres</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              hasError={!!errors?.passwordConfirmation}
              placeholder='Digite novamente sua senha'
              type='password'
              {...register('passwordConfirmation', {
                required: true,
                minLength: 6,
                validate: (value) => {
                  return value === watchPassword
                }
              })}
            />
            {errors?.passwordConfirmation?.type === 'required' && (
              <InputErrorMessage>
                A confirmação de senha é obrigatória
              </InputErrorMessage>
            )}
            {errors?.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessage>
                A confirmação de senha deve ser igual a senha
              </InputErrorMessage>
            )}
            {errors?.passwordConfirmation?.type === 'minLength' && (
              <InputErrorMessage>A confirmação de senha deve conter, no mínimo, 6 caracteres</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton
            onClick={() => handleSubmit(handleSubmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  )
}

export default SignUpPage
