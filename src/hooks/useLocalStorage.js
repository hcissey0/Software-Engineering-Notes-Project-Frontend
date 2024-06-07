import { useState } from 'react';

/**
 * A localStorage hook to be used to access localStorage
 *
 * @example
 * // returns null if user is not set
 * // otherwise returns the set user
 * const [user, setUser] = useLocalStorage('user', null);
 *
 *
 * @example
 * // sets 'token' to the provided token in localStorage
 * // and returns the set token
 * const [token, setToken] = useLocalStorage('token', 'sample_token');
 *
 * @param {String} key
 * @param {*} defaultValue
 * @returns {[*, ()=>void]}
 */
export const useLocalStorage = (key, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // First check if the item with that 'key'
            // is in the localStorage already
            // then retrieve it and return it
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            } else {
                // Otherwise set the value of the 'key'
                // as the provided value
                localStorage.setItem(key, JSON.stringify(defaultValue));
                // return the set value
                return defaultValue;
            }
        } catch (error) {
            // If there is an error, return the default value
            return defaultValue
        }
    });


    /**
     * A function that sets the value for the key
     * and saves it to the state too
     *
     * @param {*} newValue
     */
    const setValue = (newValue) => {
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.log(error);
        }
        setStoredValue(newValue);
    };

    // return the retrieved value from the localStorage
    // and a function to set the value
    return [storedValue, setValue];
}
