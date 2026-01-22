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

export const useRtdbCrud = () => {
  const { $db } = useNuxtApp()

  const subscribeList = (collection, onData) => {
    const r = dbRef($db, collection)
    const q = query(r, limitToLast(50))

    const handler = (snap) => {
      const val = snap.val() || {}
      const items = Object.entries(val).map(([id, data]) => ({
        id,
        ...data,
      }))

      items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      onData(items)
    }

    onValue(q, handler)

    return () => {
      off(q, 'value', handler)
    }
  }

  const createItem = async (collection, data) => {
    const listRef = dbRef($db, collection)
    const newRef = push(listRef)
    const payload = {
      ...data,
      createdAt: Date.now(),
    }
    await set(newRef, payload)
    return newRef.key
  }

  const updateItem = async (collection, id, data) => {
    const itemRef = dbRef($db, `${collection}/${id}`)
    await update(itemRef, data)
  }

  const deleteItem = async (collection, id) => {
    const itemRef = dbRef($db, `${collection}/${id}`)
    await remove(itemRef)
  }

  return {
    subscribeList,
    createItem,
    updateItem,
    deleteItem,
  }
}
