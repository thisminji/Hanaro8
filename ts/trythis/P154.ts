// 문제1) 다음에서 T1과 동일한 타입으로 T2를 정의하시오.

const cart = {
    X: 1,
    Y: 2,
    Z: 3,
};

// 키 문자열 유니온
type T1 = "X" | "Y" | "Z";
// 키 유니온 type Keys<T> = keyof T;
type T2 = keyof typeof cart;


// 문제2) 다음에서 T3과 동일한 타입으로 T4를 정의하시오.

const constCart = {
    X: 1,
    Y: 2,
    Z: 3,
} as const;

type T3 = 1 | 2 | 3;
// keyof -  객체 타입의 key 들만 빼서 유니온으로 만든 것
// 값 유니온 type Values<T> = T[keyof T];
type T4 = (typeof constCart)[keyof typeof constCart];
