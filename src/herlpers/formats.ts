export const getNameCurrency = (nameCurrency = '') => {
  const name = nameCurrency.split(' ');
  return name[0];
};

export const getSymbolCurrency = (symbolCurrency = '') => {
  const symbol = symbolCurrency.split('_');
  return symbol[0];
};
