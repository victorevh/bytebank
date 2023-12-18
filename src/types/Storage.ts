export class Storage {
  private constructor() {}

  static save(key: string, value: any): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  static get<T>(
    key: string,
    restore?: (this: any, key: string, value: any) => any
  ): T | null {
    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }
    if (restore) {
      return JSON.parse(value, restore) as T;
    }

    return JSON.parse(value) as T;
  }
}
