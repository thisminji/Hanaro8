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

// T: 원본 타입
// K: 타입을 바꾸고 싶은 key (T의 key여야 함)
// U: 그 key에 새로 적용할 타입
type Change<T, K extends keyof T, U> = {
    [P in keyof T]: P extends K ? U : T[P];
    //  ↑ T의 모든 key P에 대해
    //  - P가 K에 해당하면       → 타입을 U로 교체
    //  - P가 K가 아니라면       → 원래 타입 T[P] 유지
};

type DeptCaptain = Change<IDept, 'captain', IUser>;  // captain: IUser
// type Err = Change<IDept, 'xxx', IUser>;              // ❌ 'xxx'는 IDept의 key가 아니라서 Error

const dc: DeptCaptain = {
    id: 2,
    age: '1년',
    dname: 'Sales',
    captain: { id: 1, name: 'Hong', age: 33 }, // IUser 타입
};