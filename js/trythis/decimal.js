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

