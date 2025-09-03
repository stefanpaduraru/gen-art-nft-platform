export const getRandomInfuraId = (ids: string[]) =>
  ids[Math.floor(Math.random() * ids.length)] || '';
