export const priceInWeiToETH = (price: string) => {
  return parseInt(price, 10) / Math.pow(10, 9);
};
