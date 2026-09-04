import type { Document } from '../types/document'

const DB_NAME = 'DocuSaarthiDB'
const STORE_NAME = 'documents'

export function openDocumentDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = () => {
      const database = request.result

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export async function saveDocument(
  document: Document,
): Promise<void> {
  const database = await openDocumentDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(
      STORE_NAME,
      'readwrite',
    )

    const store = transaction.objectStore(STORE_NAME)

    store.put(document)

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => {
      reject(transaction.error)
    }
  })
}

export async function getDocuments(
  userId: string,
): Promise<Document[]> {
  const database = await openDocumentDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(
      STORE_NAME,
      'readonly',
    )

    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => {
      const documents =
        request.result as Document[]

      const userDocuments = documents.filter(
        (document) =>
          document.userId === userId,
      )

      resolve(userDocuments)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export async function deleteDocument(
  id: string,
): Promise<void> {
  const database = await openDocumentDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(
      STORE_NAME,
      'readwrite',
    )

    const store = transaction.objectStore(STORE_NAME)

    store.delete(id)

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => {
      reject(transaction.error)
    }
  })
}