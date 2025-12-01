function registUserObj({ name, age }: { name: string; age: number }) {
    const id = 100;
    return { id, name, age };
}

type RegistUserObj = Parameters<typeof registUserObj>[0];

const paramObj: RegistUserObj = { name: 'Hong', age: 32 };
const newUser2 = registUserObj(paramObj);
console.log('🚀 newUser2:', newUser2);