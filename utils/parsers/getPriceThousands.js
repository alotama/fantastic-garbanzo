const getPriceThousands = (num) => {
  return parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default getPriceThousands;