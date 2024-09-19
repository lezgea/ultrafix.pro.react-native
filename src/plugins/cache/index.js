import AsyncStorage from "@react-native-async-storage/async-storage";


export default class Cache
{
    static async getItem(key)
    {
        return  await AsyncStorage.getItem(key);
    }

    static async setItem(key, value)
    {
        return await AsyncStorage.setItem(key, value);
    }

    static async removeItem(key)
    {
        return await AsyncStorage.removeItem(key);
    }
};

