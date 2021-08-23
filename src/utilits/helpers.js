export const renderPhrase = (numbers) => {
  let text = ''
  switch (numbers) {
    case 0:
      text = 'Нет никого с кем можно тусануть'
      break
    case 1:
      text = `${numbers} человек тусанет с тобой`
      break
    case 2:
    case 3:
    case 4:
      text = `${numbers} человека тусанут с тобой`
      break
    default:
      text = `${numbers} человек тусанут с тобой`
  }
  return text
}

export const spanClass = (lenght) => {
  let text = ''
  lenght === 0 ? (text = 'badge bg-danger') : (text = 'badge bg-primary')

  return text
}
