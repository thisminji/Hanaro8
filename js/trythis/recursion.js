//P104
// 1 ~ n
function makeArray(n) {
    if (n <= 0) return [];
    //스프레드 문법으로 재귀 결과 배열 뒤에 n을 불변 append - 새 배열을 반환.
    return [...makeArray(n - 1), n];     // 앞(재귀 결과) + n
}


// n ~ 1
function makeReverseArray(n) {
    if (n <= 0) return [];
    // 스프레드로 재귀 결과 앞에 n을 붙여 새 배열을 반환
    return [n, ...makeReverseArray(n - 1)]; // n + 뒤(재귀 결과)
}

// TCO 스타일(꼬리재귀) - 엔진에 따라 실제 최적화는 보장X
function makeArrayTCO(n, acc = []) {
    if (n <= 0) return acc;
    return makeArrayTCO(n - 1, [...acc, n]); // 마지막 호출이 재귀
}

// 테스트
console.log(makeArray(10));        // [1,2,3,4,5,6,7,8,9,10]
console.log(makeReverseArray(5));  // [5,4,3,2,1]
console.log(makeArrayTCO(10));     // [1,2,3,4,5,6,7,8,9,10]