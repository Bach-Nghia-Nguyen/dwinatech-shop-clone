export const convertObjectToArray = (countries) =>
  Object.entries(countries || {}).map(([code, name]) => ({ code, name }));
