const hasMessageError = (error: unknown): error is Error =>
    error instanceof Error ||
    (error !== null &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string');

const messageError = (error: unknown) =>
    hasMessageError(error) ? error.message : JSON.stringify(error);

try {
    throw new Error('some error!!!!'); // 가
    // throw 'some string error!!!'; // 나
    // throw ['some', 'array', 'error']; // 다
} catch (error) {
    console.log(messageError(error)); // (라)
}
