import React, { FC, InputHTMLAttributes } from 'react'
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const CustomInput: FC<CustomInputProps> = React.forwardRef((props, ref) => {
  return <CustomInputContainer {...props} ref={ref as any} />
})

CustomInput.displayName = 'CustomInput'

export default CustomInput
