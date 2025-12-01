interface IUser {
    id: number;
    age: number;
    name: string;
}

// 해결코드
// Omit<T, K> : T에서 K 뺀 나머지 키?
// Partial<...> : 그 나머지를 전부 optional
// Pick<T, K> : K만 골라서
// Required<...> : 그 K는 필수로
// 둘을 &로 합침

type PartialRequired<T, K extends keyof T> =
    Partial<Omit<T, K>> & Required<Pick<T, K>>;

type User = PartialRequired<IUser, 'name'>;
// 결과:
// type User = {
//   id?: number;
//   age?: number;
//   name: string;
// }

let combineExclude: User = {
    name: 'Hong',
};