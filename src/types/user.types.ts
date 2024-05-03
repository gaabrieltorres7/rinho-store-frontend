interface User {
  name: string
  lastname: string
  email: string
  provider: 'firebase' | 'google'
}

export default User
