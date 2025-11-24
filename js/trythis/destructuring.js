//P54
const user = { id: 1, name: 'Hong', addr: { city: 'Seoul' } };

//파라미터에서 바로 구조 분해 (안전하게 기본값 {} 도 줌)
function f1({ id, name } = {}) {
    //꺼낸 id와 name 출력
    console.log(id, name);
}

//함수 내부에서 구조 분해 (인자 검증 포함)
function f2(u) {
    // u가 없거나 객체가 아니면 안전하게 undefined
    if (!u || typeof u !== 'object') {
        console.log(undefined, undefined);
        return;
    }
    //내부에서 구조 분해로 id와 name 꺼냄
    const { id, name } = u;
    //꺼낸 값 출력
    console.log(id, name);
}

const hong = { id: 1, name: 'Hong' };
const lee = { id: 2, name: 'Lee' };

f1(hong); f2(hong); // ⇒ 1 'Hong'
f1(lee); f2(lee);  // ⇒ 2 'Lee'

//P56
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
// 바깥 대괄호는 arr의 바깥 배열
// { id: id1 }는 객체의 id 값을 id1이라는 변수에 담아라 - 리네임
const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;
console.log(id1, id2, id3); // 1 2 3
