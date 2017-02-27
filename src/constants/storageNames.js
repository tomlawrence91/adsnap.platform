const getStorageKey = (key) => `@ADSNAP:${key}`
export const USER = (subKey) => subKey ? getStorageKey(`USER-${subKey}`) : getStorageKey('USER');
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const DEALS = getStorageKey('DEALS');