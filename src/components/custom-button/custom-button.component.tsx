import React, { ButtonHTMLAttributes, FC } from 'react'
import { CustomButtonContainer, IconContainer } from './custom-button.styles'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode
  children?: React.ReactNode
}

const CustomButton:FC<CustomButtonProps> = ({ children, startIcon, ...rest }) => {
  return (
    <CustomButtonContainer {...rest}>
      {startIcon && <IconContainer>{startIcon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  )
}

export default CustomButton
