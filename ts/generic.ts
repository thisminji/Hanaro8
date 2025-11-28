type User = {
    id: number;
    age: number;
    name: string;
}

type XX<T, P> = {
  // 목표 : id가 keyof T에 존재하면 -> 그 유저의 type을 주고, 그렇지 않으면 boolean을 주기.
  // ex) XX1은 number, XX2는 boolean
  [k in keyof T]: k extends P ? T[k] : boolean
}

type XX1 = XX<User, 'id'>
// extends string, extends number
type YY<T, P extends string | number> = {
  // 왜 error가 나냐? -> P | keyof T 의 unionedl k -> 근데 p가 string, number. symbol이 아닐 수 있다
  // (key에는 string, number. symbol만 있음))
  [k in (keyof T | P)]: k extends keyof T ? T[k] : boolean;
}
type XX2 = YY<User, 'addr' | 'city'>
type ZZ<T, P extends string, PT> = {
  // k 는 User의 key들과, addr, city가 된다. -> 그러면 key의 타입을 주고, 그렇지 않다면 PT를 달라.
  [k in keyof T | P]: k extends keyof T ? T[k] : PT;
}

// User의 key들과 p를 uniond으로 합쳐라.
type XX3 = ZZ<User, 'addr' | 'city', string>
type Y<T, P> = keyof T | P;
type Y1 = Y<User, 'x'>
type Q = {
  [k in Y1]: number
}

type Key<T> = keyof T;
// keyof를 해보면 union으로 나온다.
// type IUserKeys = 'id' | 'age' | 'name;
type IUserKeys = Key<User>; // IUser의 키들만 준다.
type TT = {
  [k in keyof User]: k;
}

//=== 어레이 타입을 받아서, 어레이 원소의 타입만 반환 === //
// type ArrayMember<T extends unknown[]> = T[number]
type ArrayMember<T extends Array<unknown>> = T[number]
type A = Array<number | string>; // (number | string)[]
// XX4는 number 타입이 오도록 해야 한다.
const ns = [1, 2, 3];
type NA = typeof ns
type XX4 = ArrayMember<NA>
const strs = ['a', 'b']
type XX5 = ArrayMember<typeof strs>
// === map의 value type을 내놔라!===//
// map도 generic을 쓴다!
// const map = new Map<string, number | string>([['id', 1], ['age', 33], ['name', 'Hong']])

const map = new Map<string, string>([['age', '33'], ['name', 'Hong']])
// const map = new Map<string, boolean>([['age', false], ['name', false]])
// map을 하나 받앗는데 -> 그 맵의 value를 받고 싶다!
type ObjectValue<M extends Object> = M[keyof M];
type XX61 = ObjectValue<User>
type MapValue<M> = M extends Map<unknown, infer Val> ? Val : unknown;
type XX6 = MapValue<typeof map> // map type의 value type만 내놔라!
type XX63 = keyof typeof map;
type MapObject<M extends Map<unknown, unknown>> = {
  [k in keyof M]: M[k];
}
type XX66 = MapObject<typeof map> // map type의 value type만 내놔라!
type ExcludeFunction<T> = T extends Function ? never : T;
type X67 = ExcludeFunction<XX6>;
type X68 = Exclude<XX6, Function>;
type Except<T, U> = T extends U ? never : T;
