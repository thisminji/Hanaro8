type Item = { item: string; price: number };

// 핵심 타입
type ItemPrice<T extends { item: any }, U> =
    Omit<T, 'item'> & { item: keyof U };

const stock = { X: 1, Y: 2, Z: 30 };

type StockItem = ItemPrice<Item, typeof stock>;

const itemPrices: StockItem[] = [
    { item: 'X', price: 1000 },
    { item: 'Y', price: 2000 },
    { item: 'Z', price: 3000 },
    // @ts-expect-error: 'P'는 stock에 없는 키라서 에러 나야 함
    { item: 'P', price: 4000 },
];

const total = itemPrices.reduce(
    (curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price,
    0
);