const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
}

export default cloneObject;