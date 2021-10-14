export const validatorConfig = {
  email: {
    isRequired: {
      message: 'Электронная почта обязательна для заполнения'
    },
    isEmail: {
      message: 'Проверьте правильность вашего email'
    }
  },
  password: {
    isRequired: { message: 'Пароль обязателен для заполнения' }
  }
}
