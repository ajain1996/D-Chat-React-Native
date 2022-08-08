import AsyncStorage from "@react-native-async-storage/async-storage";

async function get(Key, defaultValue = null) {
    try {
        let value = await AsyncStorage.getItem(Key);

        if (value !== null) {
            value = JSON.parse(value);
        }

        return value;
    } catch (error) {
        console.log('Could not save data: ' + Key, error);
    }
}

async function set(Key, value) {
    try {
        return await AsyncStorage.setItem(Key, JSON.stringify(value));
    } catch (error) {
        console.log('Could not save data: ' + Key, error);
    }
}

async function remove(Key) { }

async function clear() {
    try {
        return await AsyncStorage.clear(() => {
            console.log("Cleared");
        })
    } catch (error) {
        console.log("Could not clear data", error);
    }
}

export default {
    get,
    set,
    clear,
    remove,
}