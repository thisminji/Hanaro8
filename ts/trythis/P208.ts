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

type CombineExclude<T, U, E extends PropertyKey> = {
    [K in Exclude<keyof T | keyof U, E>]:
    K extends keyof T
    ? K extends keyof U
    ? T[K] | U[K]   // 둘 다에 있으면 union
    : T[K]          // T에만 있으면 T[K]
    : K extends keyof U
    ? U[K]          // U에만 있으면 U[K]
    : never;
};

type ICombineExclude = CombineExclude<IUser, IDept, 'name' | 'dname'>;
/*
type ICombineExclude = {
    id: number;
    age: string | number;
    captain: string;
}
*/

let combineExclude: ICombineExclude = {
    id: 0,
    age: 33,
    captain: 'ccc',
};