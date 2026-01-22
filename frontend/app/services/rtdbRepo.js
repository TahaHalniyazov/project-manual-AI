import {
  ref as dbRef,
  push,
  set,
  update,
  remove,
  onValue,
  off,
  query,
  limitToLast,
} from 'firebase/database'
import { getRtdb } from './rtdbClient.client'

const db = getRtdb()

export const rtdbRepo = {
  subscribe(collection, cb) {
    const r = dbRef(db, collection)
    const q = query(r, limitToLast(50))

    const handler = (snap) => {
      const val = snap.val() || {}
      const list = Object.entries(val).map(([id, data]) => ({ id, ...data }))
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      cb(list)
    }

    onValue(q, handler)

    return () => off(q, 'value', handler)
  },

  async create(collection, payload) {
    const listRef = dbRef(db, collection)
    const newRef = push(listRef)
    await set(newRef, { ...payload, createdAt: Date.now() })
    return newRef.key
  },

  async patch(collection, id, patch) {
    await update(dbRef(db, `${collection}/${id}`), { ...patch, updatedAt: Date.now() })
  },

  async remove(collection, id) {
    await remove(dbRef(db, `${collection}/${id}`))
  },
}
