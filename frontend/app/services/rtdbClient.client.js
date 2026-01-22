import { initializeApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

export const getRtdb = () => {
  const app = initializeApp({
    apiKey: 'demo',
    authDomain: 'demo',
    projectId: 'test-ead6f',
    databaseURL: 'http://127.0.0.1:9000',
  })

  const db = getDatabase(app)
  connectDatabaseEmulator(db, '127.0.0.1', 9000)
  return db
}
