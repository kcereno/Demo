export const extractUniqueValues = (arr: any[], key: string) => {
  return Array.from(new Set(arr.map((entry) => entry[key]))).sort();
};

export const convertToDollarString = (number: number) =>
  number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const roundUpToNearest = (value: number, increment: number) =>
  Math.ceil(value / increment) * increment;

export const calculateTicks = (min: number, max: number, increment: number) => {
  const numbers = [];
  let currentNum = min;

  while (currentNum <= max) {
    numbers.push(currentNum);
    currentNum += increment;
  }

  if (numbers.length > 0) {
    const lastIndex = numbers.length - 1;
    if (numbers[lastIndex] > max) {
      numbers[lastIndex] = Math.round(max);
    }
  }

  return numbers;
};
