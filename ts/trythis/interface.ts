interface User {
    id: number;
    name: string;
}

interface Dept {
    id: number;
    dname: string;
    captain: string;
}

// type Ud2 = (User | Dept) & {addr: string};

interface Ud2 {
    id: number; //공통
    name?: string; //User 전용
    dname?: string; //Dept 전용
    captain?: string; //Dept 전용
    [x: string]: number | string;
    addr: string;
}

// 다음 코드가 오류가 없으면 통과!
const ud2: Ud2 = { id: 1, name: 'HH', addr: 'Seoul' };
const ud3: Ud2 = { id: 1, dname: 'HH', captain: 'HH', addr: 'Seoul' };