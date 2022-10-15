export const getNumberParam = (params: { [k: string]: string | undefined }, key: string): number | undefined => {
    const origin = params[key];
    if (origin) {
        const value = Number.parseInt(origin);
        if (Number.isSafeInteger(value)) {
            return value;
        }
    }
};
