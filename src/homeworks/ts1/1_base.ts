/**
 * Нужно превратить файл в ts и указать типы аргументов и типы возвращаемого значения
 * */
export const removePlus = (string : string) => string.replace(/^\+/, '');
export const addPlus = (string: string) => `+${string}`;
export const removeFirstZeros = (value: string) => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');
export const getBeautifulNumber = (value: string, separator = ' ') => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
export const round = (value: number, accuracy = 2)  => {
  const d = 10 ** accuracy;
  return Math.round(value * d) / d;
};

const transformRegexp = /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

export const getTransformFromCss = (transformCssString : string): { x: number, y: number } => {
  const data = transformCssString.match(transformRegexp);
  
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

export const getColorContrastValue = ([red, green, blue] : number[]) =>
  // http://www.w3.org/TR/AERT#color-contrast
  Math.round((red * 299 + green * 587 + blue * 114) / 1000);

export const getContrastType = (contrastValue: number): string => (contrastValue > 125 ? 'black' : 'white');

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string): void => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) 
    throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color : string): number[] => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);

    return [red, green, blue];
  }

  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 8), 16);

  return [red, green, blue];
};

interface IResult{
  value: number;
  index: number;
}

// export const getNumberedArray = (arr) => arr.map((value, number) => ({ value, number }));
export const getNumberedArray = (arr : number[]): IResult[] => arr.map((value, index) => ({value, index}))

// export const toStringArray = (arr) => arr.map(({ value, number }) => `${value}_${number}`);
export const toStringArray = (arr: IResult[]) => arr.map(({ value, index }) => `${value}_${index}`);

interface ICustomer{
  id?: number;
  name: string;
  age: number;
  isSubscribed: boolean
}

export const transformCustomers = (customers: ICustomer[]) => {
  return customers.reduce((acc, customer) => {
    acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
    return acc;
  }, {} as Record<number, ICustomer>);
};
