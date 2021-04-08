const capitalizeFirstLetter = (string) => {
  return string.replace(/^\w/, (c) => c.toUpperCase())
}

export default capitalizeFirstLetter