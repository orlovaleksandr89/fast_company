export const newUserValidatorConfig = {
  name: {
    isRequired: { message: 'Поле обязательно для заполнения' }
  },
  lastname: {
    isRequired: { message: 'Поле обязательно для заполнения' }
  },
  dateofbirth: {
    isRequired: { message: 'Поле обязательно для заполнения' },
    isCorrectDate: { message: 'Год не может быть больше чем текущий' }
  },
  portfolio: {
    isRequired: { message: 'Поле обязательно для заполнения' },
    isValidLink: { message: 'Проверьте правильность ссылки ' }
  }
}
