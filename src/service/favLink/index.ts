const localforage = window['localforage'];
const uuidv4 = window['uuidv4'];

class FavLink {
  private db: any;
  constructor() {
    this.db = localforage.createInstance({ name: 'FavLinks' });
  }

  add(url, title) {
    const key = uuidv4();
    return this.db.setItem(key, { url, title, createTime: Date.now() });
  }

  update(key, data) {
    return this.db.setItem(key, { ...data, updateTime: Date.now() });
  }

  delete(key) {
    return this.db.removeItem(key);
  }

  async getAll() {
    const keys = await this.db.keys();
    const items = [];

    for (let i = 0; i < keys.length; i++) {
      const item = await this.db.getItem(keys[i]);
      items.push({ key: keys[i], ...item });
    }

    return items;
  }
}

const favLink = new FavLink();

export default favLink;
