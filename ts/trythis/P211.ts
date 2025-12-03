// 범용 memoize 함수
function memoize<F extends (...args: any[]) => any>(
    fn: F
): (...args: Parameters<F>) => ReturnType<F> {
    const cache = new Map<string, ReturnType<F>>();

    return (...args: Parameters<F>): ReturnType<F> => {
        const key = JSON.stringify(args); // 인자를 모두 합쳐 캐시 키로 사용

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// ================== test ==================

const memoizeAdd = memoize((a: number, b: number) => {
    return a + b;
});

console.log(memoizeAdd(1, 2)); // 3
console.log(memoizeAdd(3, 4)); // 7

const memoizeFactorial = memoize((n: number): number => {
    if (n <= 1) return 1;
    return n * memoizeFactorial(n - 1);
});

console.log(memoizeFactorial(5)); // 120
console.log(memoizeFactorial(6)); // 720 (5까지는 캐시 사용)