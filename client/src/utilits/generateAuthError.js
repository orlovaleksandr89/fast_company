export default function generateAuthError(error) {
  switch (error) {
    case 'INVALID_PASSWORD':
      return 'Email and password are incorrect'

    case 'EMAIL_NOT_FOUND':
      return 'Email and password are incorrect'

    case 'EMAIL_EXISTS':
      return 'Email already exists'

    default:
      return 'To many attempts'
  }
}
