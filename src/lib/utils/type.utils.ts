
/**
 * Utility type to get the return type of an async function.
 */
export type AsyncReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
