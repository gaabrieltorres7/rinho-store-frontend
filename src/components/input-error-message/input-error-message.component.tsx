import { FC } from 'react'
import { InputErrorMessageContainer } from './input-error-message.styles'

interface InputErrorMessageProps {
  children: string
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage
