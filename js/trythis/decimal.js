//P32
//parseFloat는 문자열 → 실수(부동소수)
//toFixed(n) 숫자를 소수점 n자리 반올림한 문자열 반환
for (let i=1; i<=10; i++){
    console.log(parseFloat((i/10).toFixed(1)));
}

//P33
for (let n=1; n<=10; n++){
    const r = Math.sqrt(n);
    // 무리수만: 제곱근이 정수면 건너뜀
    if (Number.isInteger(r)) continue;
    // `${n}`: 정수 n 값을 문자열에 삽입
    console.log(`${n}\t${r.toFixed(3)}`);
}

//P34
//getDay() 해당 날짜 숫자 반환
const WEEK_NAMES = '일월화수목금토';
const today = new Date();
console.log(`오늘은 ${WEEK_NAMES[today.getDay()]}요일입니다.`);

//P35
addPoints(0.21354, 0.1); // 0.31354
addPoints(0.14, 0.28); // 0.42
addPoints(0.34, 0.226); // 0.566
addPoints(10.34, 200.226); // 210.566
addPoints(0.143, -10.28); // -10.137
addPoints(0.143, -10); // -9.857

function addPoints(a, b) {
    const alen = pointLength(a);            // a의 소수 자릿수 길이
    const blen = pointLength(b);            // b의 소수 자릿수 길이
    const ret = (a + b).toFixed(Math.max(alen, blen)); // 긴 쪽 자릿수로 반올림해 문자열 생성
    console.log(a, b, '->', +ret);          // +ret: 문자열을 숫자로 변환해서 출력(뒤 0 제거)
}

//전체 길이-정수부 길이-소수점 빼기 = 소수부 자릿수
function pointLength(num) {
    if (!num) return 0; 
    // num.toString() -> 숫자 전체를 문자열로 바꿈
    // Math.trunc(num) -> 소수점을 버린 정수부 남기기 
    //-1 소수점 문자 빼기
    return num.toString().length - Math.trunc(num).toString().length - 1;
}

console.log('------------------------');
// 큰 스케일링 상수(=1e8). 
// 아래에서 곱했다가 나눠서 소수 오차를 줄이려는 의도.
const N = 100000000; 
avg([
    10.34232323,
    15,
    'xxx',
    5.67899,
    null,
    '20.9',
    1.005121,
    0,
    15.234,
    undefined,
    '0.5',
]);


function avg(prices) {
    let cnt = 0; // ★ 유효/무효 구분 이전에 먼저 +1
    let sum = 0;
    for (const price of prices) {
    cnt++;
    if (price === null || isNaN(price)) continue;
    sum += price * N * 100; // 스케일 크게 해서 누적
}

const ret = Math.trunc(sum / cnt / N) / 100; // 평균×100 → 버림 → /100
console.log('🚀 ~ ret:', ret);
}