export const extractUniqueValues = (arr: any[], key: string) => {
  return Array.from(new Set(arr.map((entry) => entry[key]))).sort();
};

export const convertToDollarString = (number: number) =>
  number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const roundUpToNearest = (value: number, increment: number) =>
  Math.ceil(value / increment) * increment;
