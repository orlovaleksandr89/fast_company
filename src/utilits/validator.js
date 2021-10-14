export const validator = (data, config) => {
  const errors = {}
  function validate(method, data, config) {
    switch (method) {
      case 'isRequired':
        if (data.trim() === '') {
          return config.message
        }
        break
      case 'isEmail':
        {
          const emailRegExp = /^\S+@\S+\.\S+$/g
          if (!emailRegExp.test(data)) {
            return config.message
          }
        }

        break
      default:
        break
    }
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
