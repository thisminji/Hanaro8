interface IUser {
    id: number;
    age: number;
    name: string;
}

interface IDept {
    id: number;
    age: string;
    dname: string;
    captain: string;
}

/*
Combine<T, U>
1) 공통 키 (keyof T & keyof U)         → T[K] | U[K]
2) T에만 있는 키 (Exclude<keyof T, keyof U>) → T[K]
3) U에만 있는 키 (Exclude<keyof U, keyof T>) → U[K]
*/
type Combine<T, U> =
    // 1) 공통 키: 둘 다 가지고 있는 키
    {
        [K in keyof (T & U)]: K extends(keyof T & keyof U) ? T[K] | U[K] : (T&U)[K];
    }
    // 2) T에만 있는 키
    & {
        [K in Exclude<keyof T, keyof U>]: T[K];
    }
    // 3) U에만 있는 키
    & {
        [K in Exclude<keyof U, keyof T>]: U[K];
    };

type ICombined = Combine<IUser, IDept>;