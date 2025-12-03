// // JS -> TS로 바꾸기
const assert = require('assert');

// 랜덤 시간(sec 이하) 뒤에 sec를 resolve 하는 Promise

const randTime = (sec: number): Promise<number> =>
  // 함수의 리턴 값 타입은 Promise<number>
// 나중에 숫자를 돌려주기로 약속한 비동기 결과

  new Promise(resolve => {
    // console.log('🚀 randTime:', sec);
    setTimeout(resolve, sec * 1000 * Math.random(), sec);
  });

// allSettled 결과 타입
// <T> → 제네릭 이 타입은 어떤 타입 T를 받아서 그걸 안에 넣어 쓸게
//성공한 결과
//제네릭 타입은 템플릿
//value 라는 칸이 있는데 그 칸의 타입은 나중에 T로 채울게요 
type FulfilledResult<T> = { status: 'fulfilled'; value: T };
//실패한 결과
type RejectedResult = { status: 'rejected'; reason: unknown };
//성공이든 실패든 둘 중 하나
type SettledResult<T> = FulfilledResult<T> | RejectedResult;

// const promiseAllSettled = parr =>
const promiseAllSettled = <T>(
  //이 함수는 아직 어떤 타입인 지 모름
  parr: Array<Promise<T>>,
  //parr는 Pomisee<T>들의 배열
  //인자로 T를 결과값으로 갖는 Promise 배열을 받음
): Promise<SettledResult<T>[]> =>
  //결과적으로 SettledResult 배열을 줌
  new Promise(resolve => {
    const results: SettledResult<T>[] = [];
    //여기까지도 T는 열려있음
    let runCnt = 0;
    for (let i = 0; i < parr.length; i++) {
      const p = parr[i]!; 
      // !는 여기선 undefined가 아니라 무조건 있다고 단언

      p.then(value => {
        //끝날 때마다 result[i] 결과 채워놓기
        results[i] = { status: 'fulfilled', value };
      })
        .catch(reason => {
        //끝날 때마다 result[i] 결과 채워놓기
          results[i] = { status: 'rejected', reason };
        })
        .finally(() => {
        //모두 끝났을 때 resolve(result) 호출
          if (++runCnt === parr.length) resolve(results);
        });
    }
  });

//여기서 배열은 Promise<number> / Promise<never> / Promise<number>
// qodufdml 
Promise.allSettled([randTime(1), Promise.reject('RRR'), randTime(3)]).then(
  orgArr => {
    console.log('orgArr>>', orgArr);
    promiseAllSettled([randTime(1), Promise.reject('RRR'), randTime(3)])
      .then(array => {
        console.table(array);
        console.log('여긴 과연 호출될까?111!');
        assert.deepStrictEqual(array, orgArr);
      })
      .catch(error => {
        console.log('allSettled-reject!!!!!!>>', error);
      });
  },
);

// const promiseAll = parr =>
//<T> 이 promise들이 최종적으로 돌려줄 값의 타입
//parr : Array<Promise<T>> -> Promise 배열
//Promise<T[]> -> 최종적으로 T들의 배열을 줌
const promiseAll = <T>(parr: Array<Promise<T>>): Promise<T[]> =>
  new Promise((resolve, reject) => {
    const results: T[] = [];
    let runCnt = 0;
    for (let i = 0; i < parr.length; i++) {
      const p = parr[i]!;

      p.then(res => {
        results[i] = res;
        if (++runCnt === parr.length) resolve(results);
      }).catch(reject);
    }
  });

Promise.all([randTime(1), randTime(2), randTime(3)]).then(orgArr => {
  console.log('🚀 ~ orgArr:', orgArr);
  promiseAll([randTime(1), randTime(2), randTime(3)])
    .then(arr => {
      console.table(arr);
      assert.deepStrictEqual(arr, orgArr);
    })
    .catch(console.error);
});

Promise.all([randTime(2), Promise.reject('RRR'), randTime(2.5)])
  .then(orgArr => {
    promiseAll([randTime(11), Promise.reject('RRR'), randTime(33)])
      .then(array => {
        console.log('여긴 과연 호출될까?!');
      })
      .catch(error => {
        console.log('reject!!!!!!>>', error);
      });
  })
  .catch(err => {
    console.log('orgCatch>>', err);
    assert.strictEqual(err, 'RRR');
  });



// // new Promise((resolve) => randTime().then(resolve))
async function f(): Promise<number> {
  //async 함수는 무조건 Promise 반환
  const r1 = await randTime(1);
  console.log('🚀 ~ r1:', r1);
  //return r1한다고 해도 실제로는 Promise<number>
  return r1;
}
//async & await는 promise를 조금 더 동기코드처럼 보기 좋게 만든 문법

function f2(): Promise<number> {
  return new Promise(resolve =>
    randTime(1).then(r2 => {
      console.log('🚀 ~ r2:', r2);
      resolve(r2);
    }),
  );
}
f();
f2();

const myFetch = async (url: string): Promise<any> => {
  //url은 문자열, 리턴은 어떤 타입일지 모르니 any로 
  const res = await fetch(url);
  const rrr: any = await res.json();
  console.log('🚀 ~ rrr:', rrr);
  return rrr;
};

const myFetch2 = async (url: string): Promise<any> =>
  fetch(url).then(res => res.json());

//실무에서는 any 대신 응답 타입을 제네릭으로 빼기도 함


function iter(vals: number[]) {
  //숫자를 받아서 next라는 메서드가 있는 객체 리턴
  let i = -1;
  return {
    //next()를 호출하면 항상 해당 구조의 객체가 나옴
    next(): { value: Promise<number>; done: boolean } {
      i += 1;
      //value는 Promise <number>
      return { value: randTime(vals[i]!), done: i >= 3 };
    },
  };
}

(async function () {
  const it = iter([1, 2, 3]);
  console.time('iter');
  const { value } = it.next();
  //구조 분해로 value만 꺼내고 
  console.log('🚀 ~ value:', await value);
  //await value로 그 Promise가 끝날 때까지 기다림

  // console.log('11=', await it.next().value);
  // console.log('2=', await it.next());
  // console.log('3=', await it.next());
  // console.log('4=', await it.next());
  console.timeEnd('iter');
})();