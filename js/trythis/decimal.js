//parseFloat는 문자열 → 실수(부동소수)
//toFixed(n) 숫자를 소수점 n자리 반올림한 문자열 반환
for (let i=1; i<-10; i++){
    console.log(parseFloat((i/10).toFixed(1)));
}
