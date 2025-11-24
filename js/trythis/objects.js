//P119
// 1, 2. 배열 인덱스와 값
const arr = [100, 200, 300, 400, 500, 600, 700];

// 1) 인덱스(키)
for (const k in arr) console.log(k);
// 2) 값
for (const k in arr) console.log(arr[k]);

// 3,4,5. 객체 키/값, for-of로 값
const obj = { name: 'Kim', addr: 'Seoul', level: 1, role: 9, receive: false };

// 3) 키
for (const k in obj) console.log(k);
// 4) 값
for (const k in obj) console.log(obj[k]);
// 5) for-of로 값 (values 사용)
for (const v of Object.values(obj)) console.log(v);

// 6. level은 entries에 안 나오게
Object.defineProperty(obj, 'level', { enumerable: false });
for (const [k, v] of Object.entries(obj)) console.log(k, v);
// 확인
console.log('obj.level =', obj.level); // 값은 접근 가능

// 7. role만 읽기 전용
Object.defineProperty(obj, 'role', { writable: false, configurable: false });
// 시도해도 안 바뀜(비엄격 모드는 조용히 무시, 엄격 모드는 TypeError)
obj.role = 8;
console.log('role =', obj.role); // 9