import './MyDocuments.css'
import PdfThumbnail from '../components/PdfThumbnail'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { Document } from '../types/document'
import type { DocumentCategory } from '../types/documentCategory'
import { addActivity } from '../utils/activityStorage'
import {
  saveDocument,
  getDocuments,
  deleteDocument,
} from '../utils/documentStorage'

const categories: DocumentCategory[] = [
  'Not Categorized',
  'Identity Proof',
  'Address Proof',
  'Income Certificate',
  'Education Document',
  'Photo',
  'Signature',
  'Family Document',
  'Other',
]

const sidebarCategories = [
  'Identity Proof',
  'Academic Document',
  'Certificates',
  'Income Documents',
  'Address Proof',
  'Others',
]

function MyDocuments() {
  const [documents, setDocuments] =
    useState<Document[]>([])

  const [selectedDocuments, setSelectedDocuments] =
    useState<string[]>([])

  const [searchQuery, setSearchQuery] =
    useState('')

  const [documentView, setDocumentView] =
    useState<
      'all' | 'uploaded' | 'shared' | 'trash'
    >('all')

  const [selectedCategory, setSelectedCategory] =
    useState<DocumentCategory | 'All'>('All')

  const [sortBy, setSortBy] = useState<
    'newest' | 'oldest' | 'name'
  >('newest')

  const fileInputRef =
    useRef<HTMLInputElement>(null)

  /* 
     LOAD DOCUMENTS
   */

  useEffect(() => {
    async function loadDocuments() {
      const savedUser =
        localStorage.getItem('docusaarthi-user')

      if (!savedUser) {
        return
      }

      try {
        const user = JSON.parse(savedUser)

        const savedDocuments =
          await getDocuments(user.id)
        
        const now = Date.now()
        const thirtyDays =
          30 * 24 * 60 * 60 * 1000
        
        const activeDocuments =
          savedDocuments.filter((document) => {
            if (
              document.isTrashed !== true ||
              !document.trashed
            ) {
              return true
            }
        
            const trashedTime =
              new Date(
                document.trashed,
              ).getTime()
        
            const expired =
              now - trashedTime >= thirtyDays
        
            if (expired) {
              deleteDocument(document.id)
              return false
            }
        
            return true
          })
        
        setDocuments(activeDocuments)
      } catch (error) {
        console.error(
          'Could not load documents:',
          error,
        )
      }
    }

    loadDocuments()
  }, [])

  /* 
     FILTER + SORT
   */
  
  const filteredDocuments = useMemo(() => {
    const normalizedSearch =
      searchQuery.trim().toLowerCase()
  
    const result = documents.filter(
      (document) => {

      const matchesView =
        documentView === 'trash'
          ? document.isTrashed === true
          : document.isTrashed !== true &&
            (
              documentView === 'all' ||
              documentView === 'uploaded' ||
              (
                documentView === 'shared' &&
                document.isShared === true
              )
            )
      const matchesSearch =
        normalizedSearch === '' ||
        document.name
          .toLowerCase()
          .includes(normalizedSearch)
  
      const matchesCategory =
        selectedCategory === 'All' ||
        document.category === selectedCategory

  
      return (
        matchesSearch &&
        matchesCategory &&
        matchesView
      )
    })
  
    return [...result].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
  
      const first = new Date(
        a.uploadedAt,
      ).getTime()
  
      const second = new Date(
        b.uploadedAt,
      ).getTime()
  
      return sortBy === 'newest'
        ? second - first
        : first - second
    })
  }, [
    documents,
    searchQuery,
    selectedCategory,
    sortBy,
    documentView,
  ])

  /* 
     STATISTICS
   */

  const totalDocuments =
    documents.length

  const categorizedDocuments =
    documents.filter(
      (document) =>
        document.category !==
        'Not Categorized',
    ).length

  const pdfDocuments =
    documents.filter(
      (document) =>
        document.name
          .toLowerCase()
          .endsWith('.pdf'),
    ).length

  const imageDocuments =
    documents.filter((document) => {
      const name =
        document.name.toLowerCase()

      return (
        name.endsWith('.jpg') ||
        name.endsWith('.jpeg') ||
        name.endsWith('.png')
      )
    }).length

  /* 
     UPLOAD
   */

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    const savedUser =
      localStorage.getItem(
        'docusaarthi-user',
      )

    if (!savedUser) {
      alert('Please log in first.')
      return
    }

    const user = JSON.parse(savedUser)

    const newDocument: Document = {
      id: crypto.randomUUID(),
      userId: user.id,
      file,
      name: file.name,
      category: 'Not Categorized',
      uploadedAt:
        new Date().toISOString(),
        isShared: false,
        isTrashed: false,
    }

    await saveDocument(
      newDocument,
    )

    addActivity(
      user.id,
      'UPLOAD',
      `Uploaded ${newDocument.name}`,
    )

    setDocuments(
      (currentDocuments) => [
        ...currentDocuments,
        newDocument,
      ],
    )

    event.target.value = ''
  }

  
  /* 
     MOVE TO TRASH
   */
  
  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to move this document to Trash?',
    )
  
    if (!confirmed) {
      return
    }
  
    const document = documents.find(
      (item) => item.id === id,
    )
  
    if (!document) {
      return
    }
  
    const updatedDocument: Document = {
      ...document,
      isTrashed: true,
      trashed: new Date(). toISOString(),
    }
  
    await saveDocument(updatedDocument)
  
    setDocuments((currentDocuments) =>
      currentDocuments.map((item) =>
        item.id === id
          ? updatedDocument
          : item,
      ),
    )
  
    setSelectedDocuments((currentSelected) =>
      currentSelected.filter(
        (documentId) => documentId !== id,
      ),
    )
  }
  /* 
   RESTORE FROM TRASH
  */

async function handleRestore(id: string) {
  const document = documents.find(
    (item) => item.id === id,
  )

  if (!document) {
    return
  }

  const restoredDocument: Document = {
    ...document,
    isTrashed: false,
    trashed: undefined,
  }

  await saveDocument(restoredDocument)

  setDocuments((currentDocuments) =>
    currentDocuments.map((item) =>
      item.id === id
        ? restoredDocument
        : item,
    ),
  )

  setSelectedDocuments((currentSelected) =>
    currentSelected.filter(
      (documentId) => documentId !== id,
    ),
  )
}
/* 
   DELETE PERMANENTLY
  */

async function handleDeletePermanently(
  id: string,
) {
  const confirmed = window.confirm(
    'Are you sure you want to permanently delete this document? This cannot be undone.',
  )

  if (!confirmed) {
    return
  }

  const document = documents.find(
    (item) => item.id === id,
  )

  if (!document) {
    return
  }

  await deleteDocument(id)

  setDocuments((currentDocuments) =>
    currentDocuments.filter(
      (item) => item.id !== id,
    ),
  )

  setSelectedDocuments((currentSelected) =>
    currentSelected.filter(
      (documentId) => documentId !== id,
    ),
  )
}

  /* 
     RENAME
   */

  async function handleRename(
    id: string,
  ) {
    const document =
      documents.find(
        (item) => item.id === id,
      )

    if (!document) {
      return
    }

    const newName =
      window.prompt(
        'Enter a new name for this document:',
        document.name,
      )

    if (
      !newName ||
      !newName.trim()
    ) {
      return
    }

    const updatedDocument = {
      ...document,
      name: newName.trim(),
    }

    await saveDocument(
      updatedDocument,
    )

    const savedUser =
      localStorage.getItem(
        'docusaarthi-user',
      )

    if (savedUser) {
      try {
        const user =
          JSON.parse(savedUser)

        addActivity(
          user.id,
          'RENAME',
          `Renamed ${document.name} to ${updatedDocument.name}`,
        )
      } catch (error) {
        console.error(
          'Could not record rename activity:',
          error,
        )
      }
    }

    setDocuments(
      (currentDocuments) =>
        currentDocuments.map(
          (item) =>
            item.id === id
              ? updatedDocument
              : item,
        ),
    )
  }

  /* 
     CATEGORY
   */

  async function handleCategoryChange(
    id: string,
    category: DocumentCategory,
  ) {
    const updatedDocuments =
      documents.map(
        (document) =>
          document.id === id
            ? {
                ...document,
                category,
              }
            : document,
      )

    const updatedDocument =
      updatedDocuments.find(
        (document) =>
          document.id === id,
      )

    if (!updatedDocument) {
      return
    }

    await saveDocument(
      updatedDocument,
    )

    setDocuments(
      updatedDocuments,
    )
  }

  /* 
     SELECTION
   */

  function toggleDocumentSelection(
    id: string,
  ) {
    setSelectedDocuments(
      (currentSelected) => {
        if (
          currentSelected.includes(id)
        ) {
          return currentSelected.filter(
            (documentId) =>
              documentId !== id,
          )
        }

        return [
          ...currentSelected,
          id,
        ]
      },
    )
  }

  function toggleSelectAll() {
    if (
      filteredDocuments.length === 0
    ) {
      return
    }

    const allFilteredSelected =
      filteredDocuments.every(
        (document) =>
          selectedDocuments.includes(
            document.id,
          ),
      )

    if (allFilteredSelected) {
      setSelectedDocuments(
        (currentSelected) =>
          currentSelected.filter(
            (id) =>
              !filteredDocuments.some(
                (document) =>
                  document.id === id,
              ),
          ),
      )
    } else {
      setSelectedDocuments(
        (currentSelected) => {
          const next = new Set(
            currentSelected,
          )

          filteredDocuments.forEach(
            (document) => {
              next.add(document.id)
            },
          )

          return Array.from(next)
        },
      )
    }
  }

  /* 
     SHARE
   */

  async function handleShareSelected() {
    if (
      selectedDocuments.length === 0
    ) {
      alert(
        'Select at least one document to share.',
      )
      return
    }

    const documentsToShare =
      documents.filter(
        (document) =>
          selectedDocuments.includes(
            document.id,
          ),
      )

    const filesToShare =
      documentsToShare
        .map(
          (document) =>
            document.file,
        )
        .filter(
          (
            file,
          ): file is File =>
            file instanceof File,
        )

    if (filesToShare.length === 0) {
      alert(
        'The selected documents have no file data.',
      )
      return
    }

    try {
      const formData =
        new FormData()

      filesToShare.forEach(
        (file) => {
          formData.append(
            'documents',
            file,
          )
        },
      )

      formData.append(
        'expiresInDays',
        '7',
      )

      const response =
        await fetch(
          'http://localhost:3000/api/shares',
          {
            method: 'POST',
            body: formData,
          },
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Could not create share link',
        )
      }

      const sharedIds = new Set(
        selectedDocuments,
      )
      
      const updatedDocuments = documents.map(
        (document) =>
          sharedIds.has(document.id)
            ? {
                ...document,
                isShared: true,
              }
            : document,
      )
      
      for (const document of updatedDocuments) {
        if (sharedIds.has(document.id)) {
          await saveDocument(document)
        }
      }
      
      setDocuments(updatedDocuments)

      await navigator.clipboard.writeText(
        data.shareUrl,
      )

      alert(
        `Share link created!\n\n${data.shareUrl}\n\nThe link has been copied to your clipboard.`,
      )
    } catch (error) {
      console.error(
        'Share error:',
        error,
      )

      alert(
        error instanceof Error
          ? error.message
          : 'Could not create share link.',
      )
    }
  }

  /* 
     HELPERS
   */

  function getFileExtension(
    name: string,
  ) {
    return (
      name
        .split('.')
        .pop()
        ?.toUpperCase() ||
      'FILE'
    )
  }

  function formatDate(
    uploadedAt: string,
  ) {
    const date =
      new Date(uploadedAt)

    return date.toLocaleDateString(
      undefined,
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    )
  }

  

  function handleView(
    document: Document,
  ) {
    if (
      !(document.file instanceof Blob)
    ) {
      console.error(
        'Document file is not a valid file.',
      )
      return
    }

    const fileUrl =
      URL.createObjectURL(
        document.file,
      )

    window.open(
      fileUrl,
      '_blank',
    )
  }

  /* 
     RENDER
   */

  return (
    <main className="documents-page">

      <div className="documents-layout">

        {/* 
            DOCUMENT SIDEBAR
         */}

        <aside className="documents-sidebar">

          <div className="documents-sidebar-section">

            <h3>
              DOCUMENTS
            </h3>

            <button
              type="button"
              className={`documents-sidebar-item ${
                documentView === 'all'
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                setDocumentView('all')
                setSelectedCategory('All')
              }}
            >
              <span>▣</span>
              <span>
                All Documents
              </span>
            </button>

            <button
              type="button"
              className={`documents-sidebar-item ${
                documentView === 'uploaded'
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                setDocumentView('uploaded')
                setSelectedCategory('All')
              }}
            >
              <span>↑</span>
              <span>
                Uploaded Documents
              </span>
            </button>

            <button
              type="button"
              className={`documents-sidebar-item ${
                documentView === 'shared'
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                setDocumentView('shared')
              }}
            >
              <span>↗</span>
              <span>
                Shared Documents
              </span>
            </button>

            <button
              type="button"
              className={`documents-sidebar-item ${
                documentView === 'trash'
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                setDocumentView('trash')
              }}
            >
              <span>🗑</span>
              <span>
                Trash
              </span>
            </button>

          </div>

          <div className="documents-sidebar-section">

            <h3>
              CATEGORIES
            </h3>

            {sidebarCategories.map(
              (category) => (
                <button
                  type="button"
                  className="documents-sidebar-item"
                  key={category}
                  onClick={() => {
                    setDocumentView('all')

                    setSelectedCategory(
                      category ===
                        'Academic Document'
                        ? 'Education Document'
                        : category ===
                            'Income Documents'
                          ? 'Income Certificate'
                          : category ===
                              'Others'
                            ? 'Other'
                            : category as DocumentCategory,
                    )
                  }}
                >
                  <span>□</span>

                  <span>
                    {category}
                  </span>
                </button>
              ),
            )}

          </div>

        </aside>

        {/* 
            MAIN DOCUMENT CONTENT
         */}

        <div className="documents-content">
                    {/* 
              PAGE HEADER
           */}

          <section className="documents-header">

            <div>
              <p className="documents-eyebrow">
                DOCUMENT VAULT
              </p>

              <h1>
                My Documents
              </h1>

              <p className="documents-description">
                Securely manage and organize
                your personal documents.
              </p>
            </div>

            <div className="documents-header-actions">

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                hidden
                onChange={handleFileChange}
              />

              <button
                type="button"
                className="upload-document-button"
                onClick={handleUploadClick}
              >
                <span>+</span>
                Upload Document
              </button>

              <button
                type="button"
                className="share-selected-button"
                onClick={handleShareSelected}
                disabled={
                  selectedDocuments.length === 0
                }
              >
                🔗 Share Selected
              </button>

            </div>

          </section>


          {/* 
              STATISTICS
           */}

          <section className="document-statistics">

            <article className="document-stat-card">
              <div className="document-stat-icon blue">
                📁
              </div>

              <div>
                <strong>
                  {totalDocuments}
                </strong>

                <span>
                  Total Documents
                </span>
              </div>
            </article>


            <article className="document-stat-card">
              <div className="document-stat-icon green">
                ✓
              </div>

              <div>
                <strong>
                  {categorizedDocuments}
                </strong>

                <span>
                  Categorized
                </span>
              </div>
            </article>


            <article className="document-stat-card">
              <div className="document-stat-icon red">
                PDF
              </div>

              <div>
                <strong>
                  {pdfDocuments}
                </strong>

                <span>
                  PDF Files
                </span>
              </div>
            </article>


            <article className="document-stat-card">
              <div className="document-stat-icon purple">
                🖼
              </div>

              <div>
                <strong>
                  {imageDocuments}
                </strong>

                <span>
                  Images
                </span>
              </div>
            </article>


            <article className="document-stat-card">
              <div className="document-stat-icon orange">
                ✓
              </div>

              <div>
                <strong>
                  {selectedDocuments.length}
                </strong>

                <span>
                  Selected
                </span>
              </div>
            </article>

          </section>


          {/* 
              TOOLBAR
           */}

          <section className="documents-toolbar">

            <div className="documents-search">

              <span>
                🔍
              </span>

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value,
                  )
                }
                placeholder="Search documents..."
              />

            </div>


            <div className="documents-filters">

              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(
                    event.target.value as
                      | DocumentCategory
                      | 'All',
                  )
                }
              >
                <option value="All">
                  All Categories
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ),
                )}
              </select>


              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as
                      | 'newest'
                      | 'oldest'
                      | 'name',
                  )
                }
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="name">
                  Name
                </option>
              </select>

            </div>

          </section>


          {/* 
              SELECTION BAR
           */}

          {selectedDocuments.length > 0 && (
            <div className="selection-info">

              <span>
                {selectedDocuments.length}{' '}
                document
                {selectedDocuments.length > 1
                  ? 's'
                  : ''}{' '}
                selected
              </span>

              <button
                type="button"
                onClick={() =>
                  setSelectedDocuments([])
                }
              >
                Clear Selection
              </button>

            </div>
          )}


          {/* 
              DOCUMENT LIST
           */}

          <section className="documents-panel">

            <div className="documents-panel-header">

              <div>
                <h2>
                  Your Documents
                </h2>

                <p>
                  {filteredDocuments.length}{' '}
                  {filteredDocuments.length === 1
                    ? 'document'
                    : 'documents'}{' '}
                  shown
                </p>
              </div>


              <label className="select-all-control">

                <input
                  type="checkbox"
                  checked={
                    filteredDocuments.length > 0 &&
                    filteredDocuments.every(
                      (document) =>
                        selectedDocuments.includes(
                          document.id,
                        ),
                    )
                  }
                  onChange={toggleSelectAll}
                />

                <span>
                  Select all
                </span>

              </label>

            </div>


            {/* 
                EMPTY STATE
             */}

            {filteredDocuments.length === 0 ? (

              <div className="documents-empty">

                <div className="documents-empty-icon">
                  📄
                </div>

                <h3>
                  {documents.length === 0
                    ? 'No documents yet'
                    : 'No documents found'}
                </h3>

                <p>
                  {documents.length === 0
                    ? 'Upload your first document to start building your personal vault.'
                    : 'Try changing your search or category filter.'}
                </p>

                {documents.length === 0 && (
                  <button
                    type="button"
                    onClick={handleUploadClick}
                  >
                    Upload Document
                  </button>
                )}

              </div>

            ) : (

              /* 
                 DOCUMENT GRID
               */

              <div className="documents-grid">

                {filteredDocuments.map(
                  (document) => {

                    const isSelected =
                      selectedDocuments.includes(
                        document.id,
                      )

                    const fileExtension =
                      document.name
                        .split('.')
                        .pop()
                        ?.toLowerCase() || ''

                    const isImage =
                      fileExtension === 'jpg' ||
                      fileExtension === 'jpeg' ||
                      fileExtension === 'png'

                    const isPdf =
                      fileExtension === 'pdf'

                    return (

                      <article
                        className={`document-preview-card ${
                          isSelected
                            ? 'selected'
                            : ''
                        }`}
                        key={document.id}
                      >

                        {/* 
                            DOCUMENT PREVIEW
                         */}

                        <div className="document-preview">

                          <label className="preview-checkbox">

                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                toggleDocumentSelection(
                                  document.id,
                                )
                              }
                            />

                            <span />

                          </label>


                          {isImage &&
                          document.file instanceof Blob ? (

                            <img
                              src={URL.createObjectURL(
                                document.file,
                              )}
                              alt={document.name}
                            />

                          ) : isPdf &&
                            document.file instanceof Blob ? (

                            <PdfThumbnail
                              file={document.file}
                            />

                          ) : (

                            <div className="document-preview-file">

                              <span>
                                FILE
                              </span>

                            </div>

                          )}

                        </div>


                        {/* 
                            DOCUMENT INFORMATION
                         */}

                        <div className="document-preview-info">

                          <h3
                            title={document.name}
                          >
                            {document.name}
                          </h3>


                          <select
                            value={
                              document.category
                            }
                            onChange={(event) =>
                              handleCategoryChange(
                                document.id,
                                event.target
                                  .value as DocumentCategory,
                              )
                            }
                          >

                            {categories.map(
                              (category) => (

                                <option
                                  key={category}
                                  value={category}
                                >
                                  {category}
                                </option>

                              ),
                            )}

                          </select>


                          <p>
                            {formatDate(
                              document.uploadedAt,
                            )}{' '}
                            ·{' '}
                            {getFileExtension(
                              document.name,
                            )}
                          </p>

                        </div>


                        {/* 
                            ACTIONS
                         */}

                        <div className="document-preview-actions">
                          {documentView === 'trash' ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRestore(document.id)
                                }
                              >
                                Restore
                              </button>
                        
                              <button
                                type="button"
                                className="delete"
                                onClick={() =>
                                  handleDeletePermanently(document.id)
                                }
                              >
                                Delete Permanently
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleView(document)
                                }
                              >
                                View
                              </button>
                        
                              <button
                                type="button"
                                onClick={() =>
                                  handleRename(document.id)
                                }
                              >
                                Rename
                              </button>
                        
                              <button
                                type="button"
                                className="delete"
                                onClick={() =>
                                  handleDelete(document.id)
                                }
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>

                      </article>

                    )
                  },
                )}

              </div>

            )}

          </section>


          {/* 
              FOOTER / HELP
           */}

          <section className="documents-help">

            <div className="documents-help-icon">
              💡
            </div>

            <div>

              <h3>
                Keep your documents organized
              </h3>

              <p>
                Upload clear copies of your
                important documents and assign
                categories so you can find them
                quickly when completing services
                and forms.
              </p>

            </div>

          </section>

        </div>

      </div>

    </main>
  )
}

export default MyDocuments