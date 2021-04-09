const getPriceDecimals = (amountPrince) => {
  let decimals = (amountPrince % 1).toFixed(2).substring(2)
  return decimals;
}

export default getPriceDecimals;