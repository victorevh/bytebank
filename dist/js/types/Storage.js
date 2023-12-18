export class Storage {
    constructor() { }
    static save(key, value) {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    }
    static get(key, restore) {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        if (restore) {
            return JSON.parse(value, restore);
        }
        return JSON.parse(value);
    }
}
