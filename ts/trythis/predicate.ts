const isStringNumber = (value: unknown): value is [string, number] => {
    return (
        Array.isArray(value) &&           // 1) 배열인지 확인
        value.length === 2 &&             // 2) 길이가 2인지 확인
        typeof value[0] === 'string' &&   // 3) 첫 번째 요소가 string인지
        typeof value[1] === 'number'      // 4) 두 번째 요소가 number인지
    );
};

const f1 = (value: number | string | boolean | [string, number]) => {
    if (isStringNumber(value)) { //true이면
        // value는 [string, number] 타입임이 보장
        console.log(value[0].toUpperCase(), value[1].toFixed());
    }
};

f1(['item', 1000]); // "ITEM 1000" 이런 식으로 출력

interface Animal { }
interface Dog extends Animal {
    name: string;
}
interface Cat extends Animal {
    punch(): void;
}
class Navi implements Cat {
    punch() {
        console.log('kukuki');
    }
}
console.log('navi is dog:', isDog(new Navi()));
class Retriever implements Dog {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
const r = new Retriever('Maxx');
console.log('Maxx is dog:', isDog(r));

function isDog(a: Animal): a is Dog {
    return !!a && typeof a === 'object' && 'name' in a && !('punch' in a);
}
