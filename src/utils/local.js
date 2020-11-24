export const local = {
  set(key, cont) {
    localStorage.setItem(key, cont)
  },
  get(key) {
    return localStorage.getItem(key)
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}
