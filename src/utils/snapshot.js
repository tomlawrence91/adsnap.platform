import { AsyncStorage } from 'react-native';
import { fromJS } from 'immutable';
import { setItem, getItem, clearItem } from '../services/storageService';
const STATE_STORAGE_KEY = 'adsnap@1.0:STATE';

export async function resetSnapshot() {
    const state = await getItem(STATE_STORAGE_KEY);
    if (state) {
        return fromJS(state);
    }

    return null;
}

export async function saveSnapshot(state) {
    await setItem(STATE_STORAGE_KEY, JSON.stringify(state.toJS()));
}

export async function clearSnapshot() {
    await clear();
}

