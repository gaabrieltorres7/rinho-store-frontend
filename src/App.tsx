import { FC } from 'react'

// components
import Header from './components/header/header.component'

interface AppProps {
  message?: string
}

const App: FC<AppProps> = ({ message }) => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default App
