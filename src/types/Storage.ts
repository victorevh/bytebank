export class Storage {
  private constructor() {}

  static save(key: string, value: any): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  static get(key: string, restore?: (this: any, key: string, value: any) => any) {
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
