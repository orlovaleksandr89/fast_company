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
    isRequired: { message: 'Пароль обязателен для заполнения' },
    isCapitalLetter: { message: 'Пароль должен содержать загланую букву' },
    isNumber: { message: 'Пароль должен содержать цыфру' },
    min: {
      message: 'Пароль должен быть не меньше 8 символов',
      value: 8
    }
  },
  profession: {
    isRequired: { message: 'Профессия обязательна к выбору' }
  }
}
