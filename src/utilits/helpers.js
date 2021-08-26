export const renderPhrase = (numbers) => {
  let text = ''

  const lastNumber = Number(numbers.toString().split('').slice(-1))
  if (numbers === 0) return (text = 'Нет никого с кем можно тусануть')
  if (numbers === 1) return `${numbers} человек тусанeт с тобой`
  if (numbers > 1 && numbers < 5)
    return (text = `${numbers} человека тусанут с тобой`)

  if (numbers > 14 && [2, 3, 4].includes(lastNumber))
    return (text = `${numbers} человека тусанут с тобой`)
  if (numbers > 14 && [1].includes(lastNumber))
    return (text = `${numbers} человек тусанeт с тобой`)

  text = `${numbers} человек тусанyт с тобой`
  return text
}

export const spanClass = (lenght) => {
  let text = ''
  lenght === 0 ? (text = 'badge bg-danger') : (text = 'badge bg-primary')

  return text
}
