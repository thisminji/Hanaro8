type User = {
    id: number;
    name: string;
    12: number;
};

/*
1) key가 number 타입이면 key 앞에 user_를 붙이기
- id, name 은 string key → 그대로 유지
- 12 는 number key → user_12 로 변경
*/
type UserNumKeyPrefix = {
    // k: 'id' | 'name' | 12
    // as 뒤에서 key 이름을 바꿔줌
    [k in keyof User as k extends number ? `user_${k}` : k]: User[k];
    //  - k가 number면:   `user_${k}` → `user_12`
    //  - number가 아니면: k 그대로 유지 → 'id', 'name'
};

/*
2) key가 string 타입인 것만 남기기
- 'id', 'name' 만 남기고
- 12(number key)는 제거
*/
type UserOnlyStrKey = {
    // k가 string이면 k 그대로, 아니면 never → 걸러짐
    [k in keyof User as k extends string ? k : never]: User[k];
    // 결과: { id: number; name: string; }
};

/*
3) User에서 key가 string 타입인 것만 남기고, prefix(user_)를 붙이기
- 'id'  → 'user_id'
- 'name' → 'user_name'
- 12는 number key니까 제외
*/
type UserOnlyStrKeyPrefix = {
    // string key만 남기면서, 앞에 user_ 붙이기
    [k in keyof User as k extends string ? `user_${k}` : never]: User[k];
    //  - k = 'id'   → `user_${k}` = 'user_id'
    //  - k = 'name' → `user_${k}` = 'user_name'
    //  - k = 12     → k extends string 이 false → never → 제거
};