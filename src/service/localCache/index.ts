const localforage = window['localforage'];
const uuidv4 = window['uuidv4'];

class LocalCache {
  private db: any;
  constructor(db) {
    this.db = localforage.createInstance({ name: db });
  }

  static getCache(db: string) {
    return new LocalCache(db);
  }

  add(content) {
    const key = uuidv4();
    return this.db.setItem(key, { content, createTime: Date.now() });
  }
}

export default LocalCache;
