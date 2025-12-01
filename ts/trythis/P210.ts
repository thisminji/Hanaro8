// cb의 타입을 제네릭으로 받는다
function debounce<F extends (...args: any[]) => void>(
    cb: F,
    delay: number
): (...args: Parameters<F>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => cb(...args), delay);
    };
}

function throttle<F extends (...args: any[]) => void>(
    cb: F,
    delay: number
): (...args: Parameters<F>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>) => {
        if (timer) return;
        timer = setTimeout(() => {
            cb(...args);
            timer = null;
        }, delay);
    };
}


// ================= test =================

const debo = debounce((a: number, b: string) => console.log(a + 1, b), 1000);
for (let i = 10; i < 15; i++) debo(i, 'abc');   // 마지막 호출만: 15, 'abc'

const thro = throttle((a: number) => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) thro(i);          // 처음 한 번만: 11