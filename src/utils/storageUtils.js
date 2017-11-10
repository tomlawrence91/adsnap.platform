import { AsyncStorage } from 'react-native';

export async function storeItem(storageKey, value) {
	try {
		await AsyncStorage.setItem(storageKey, value);
	} catch (e) {
		console.error('Error while persisting value.', e);
	}
}

export async function getStoredItem(storageKey) {
	try {
		const item = await AsyncStorage.getItem(storageKey);
		return item
			? item
			: null;
	} catch (e) {
		console.error('Error while reading persisted item.', e);
		return null;
	}
}

export async function deleteStoredItem(storageKey) {
	try {
		await AsyncStorage.removeItem(storageKey);
	} catch (e) {
		console.error('Error clearing peristed application state', e);
	}
}