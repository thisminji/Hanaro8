//P110
//Node의 단언 라이브러리
//기대값과 실제값이 다르면 테스트실패 알려줌
const assert = require('assert');

assert.equal(loopFibonacci(5), 5);
assert.equal(loopFibonacci(7), 13);
assert.equal(loopFibonacci(30), 832040);

function loopFibonacci(n) {
    //초기값
  const seqs = [0, 1];
  //2부터 n까지 이전 두 항의 합을 뒤에 붙여감
  for (let i = 2; i <= n; i++) {
    seqs.push(seqs[i - 2] + seqs[i - 1]);
  }
  //n번째 값 반환
  return seqs[n];
}

assert.equal(recurFibonacci(5), 5);
assert.equal(recurFibonacci(7), 13);
assert.equal(recurFibonacci(30), 832040);
function recurFibonacci(n) {
  if (n <= 1) return n;
  return recurFibonacci(n - 2) + recurFibonacci(n - 1);
}

// memoized 고차함수로 감싸 결과를 캐시
const memoFibonacci = memoized(function (n) {
  if (n <= 1) return n;
  return memoFibonacci(n - 2) + memoFibonacci(n - 1);
});
assert.equal(memoFibonacci(5), 5);
assert.equal(memoFibonacci(7), 13);
assert.equal(memoFibonacci(30), 832040);

// 호출 결과를 저장할 캐시 객체. (클로저로 유지됨)
function memoized(fn) {
  const cache = {};
  return function (n) {
    //래퍼 함수 반환 
    return cache[n] ?? (cache[n] = fn(n));
  };
}

//실행시간 측정
function runFn(fn) {
  console.time(fn.name || 'memoFibonacci');
  for (let i = 10; i < 1000; i += 10) {
    fn(i);
  }
  console.timeEnd(fn.name || 'memoFibonacci');
}
runFn(loopFibonacci);
runFn(memoFibonacci);