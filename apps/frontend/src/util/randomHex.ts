const generateRandomHex = (size: number) =>
  "0x" +
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

export default generateRandomHex;
