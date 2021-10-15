export const renderPhrase = (numbers) => {
  let text = ''

  const lastNumber = Number(numbers.toString().split('').slice(-1))
  if (numbers === 0) return (text = 'Нет никого с кем можно тусануть')
  if (numbers === 1) return `${numbers} человек тусанeт с тобой`
  if (numbers > 1 && numbers < 5) {
    return (text = `${numbers} человека тусанут с тобой`)
  }

  if (numbers > 14 && [2, 3, 4].includes(lastNumber)) {
    return (text = `${numbers} человека тусанут с тобой`)
  }
  if (numbers > 14 && [1].includes(lastNumber)) {
    return (text = `${numbers} человек тусанeт с тобой`)
  }

  text = `${numbers} человек тусанyт с тобой`
  return text
}

export const spanClass = (lenght) => {
  let text = ''
  lenght === 0 ? (text = 'badge bg-danger') : (text = 'badge bg-primary')

  return text
}
export const renderYears = (date) => {
  let text = ''
  const tadayYear = new Date().getFullYear()
  const yearFromUserDate = Number(date.split('-')[0])

  const difference = tadayYear - yearFromUserDate
  const lastNumber = difference.toString().slice(-1)
  switch (lastNumber) {
    case '1':
      text = 'год'
      break
    case '2':
      text = 'года'
      break
    case '3':
      text = 'года'
      break
    case '4':
      text = 'года'
      break
    case '5':
      text = 'лет'
      break

    default:
      text = difference > 10 ? 'лет' : 'год'
      break
  }

  return `(${difference} ${text}) `
}
