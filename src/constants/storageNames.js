const getStorageKey = key => `@ADSNAP:${key}`;
export const ACCESS_TOKEN = getStorageKey("ACCESS_TOKEN");
export const ID_TOKEN = getStorageKey("ID_TOKEN");
export const DEALS = getStorageKey("DEALS");
export const USER = getStorageKey("USER");
