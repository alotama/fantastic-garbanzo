const getTranslatedCondition = (condition) => {
  switch (condition) {
    case 'new':
      return 'Nuevo'
    case 'used':
      return 'Usado'
    default:
      break;
  }
}

export default getTranslatedCondition;