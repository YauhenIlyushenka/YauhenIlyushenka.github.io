/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 */
export type Category = {
    id: string;
    name: string;
    photo?: string
};

/**
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 */
 export type Product = {
    id: string;
    name: string;
    photo: string;
    desc?: string;
    createdAt: string;
    oldPrice?: number;
    price: number;
    category: Category;
 }

/**
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 */
export type Operation = Cost | Profit

/**
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 */
export type Cost = {
    id: string;
    name: string;
    desc?: string;
    createdAt: string;
    amount: number;
    category: Category;
    type: string;
}

/** 
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 */
export type Profit = {
    id: string;
    name: string;
    desc?: string;
    createdAt: string;
    amount: number;
    category: Category;
    type: string;
}

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */

export enum Characteristic{
    Even,
    Odd,
}

export const isEvenNumber = (numberValue: number): boolean => (numberValue % 2 === 0);
export const getRandomNumber = (inputNumber: number): number => (Math.round(Math.random() * inputNumber));
export const getStringValue = (propertyName: string, randomNumber: number, characteristic?: Characteristic): string => (characteristic ? `${propertyName}${characteristic}_${randomNumber}`: `${propertyName}_${randomNumber}`);

export const createProduct = (characteristic: Characteristic, createdAt: string, dateValue: Date): Product => ({
    id: getStringValue("Id", getRandomNumber(dateValue.getFullYear()), characteristic),
    name: getStringValue("Name", getRandomNumber(dateValue.getDate()), characteristic),
    photo: getStringValue("Photo", getRandomNumber(dateValue.getDay()), characteristic),
    createdAt: createdAt,
    desc: getStringValue("Description", getRandomNumber(dateValue.getMonth()), characteristic),
    oldPrice: getRandomNumber(dateValue.getDate()),
    price: getRandomNumber(dateValue.getDate()),
    category:{
        id: getStringValue("CategoryId", getRandomNumber(dateValue.getFullYear()), characteristic),
        name: getStringValue("CategoryName", getRandomNumber(dateValue.getDate()), characteristic),
        photo: getStringValue("CategoryPhoto", getRandomNumber(dateValue.getDay()), characteristic),
    } 
})

export const createRandomProduct = (createdAt: string): Product => {

    const dateValue = new Date(createdAt);
    return isEvenNumber(getRandomNumber(dateValue.getDate())) 
        ? createProduct(Characteristic.Even, createdAt, dateValue)
        : createProduct(Characteristic.Odd, createdAt, dateValue)
};


/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createOperation = (operation: string, createdAt: string, dateValue: Date): Operation => ({
    id: getStringValue("Id", getRandomNumber(dateValue.getFullYear())),
    name: getStringValue("Name", getRandomNumber(dateValue.getDate())),
    desc: getStringValue("Description", getRandomNumber(dateValue.getMonth())),
    createdAt: createdAt,
    amount: getRandomNumber(dateValue.getDate()),
    category: {
        id: getStringValue("CategoryId", getRandomNumber(dateValue.getFullYear())),
        name: getStringValue("CategoryName", getRandomNumber(dateValue.getDate())),
        photo: getStringValue("CategoryPhoto", getRandomNumber(dateValue.getDay())),
    },
    type: operation,
})

export const createRandomOperation = (createdAt: string): Operation => {
    const dateValue = new Date(createdAt);
    return isEvenNumber(getRandomNumber(dateValue.getDate()))
        ? (createOperation("Cost", createdAt, dateValue) as Cost)
        : (createOperation("Profit", createdAt, dateValue) as Profit)
};
