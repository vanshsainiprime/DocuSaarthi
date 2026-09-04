import './AIAssistant.css'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'


type Message = {
  id: number
  sender: 'user' | 'ai'
  text: string
}

type AIAssistantProps = {
  isOpen: boolean
  onClose: () => void
}

function AIAssistant({
  isOpen,
  onClose,
}: AIAssistantProps) {
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null)

  const [isLoading, setIsLoading] =
    useState(false)

  const fileInputRef =
    useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text:
        "Hi! I'm your DocuSaarthi AI assistant. How can I help you?",
    },
  ])

  async function handleSend() {
    if (
      (!message.trim() && !selectedFile) ||
      isLoading
    ) {
      return
    }

    /* 
       FILE / IMAGE MESSAGE
     */

    if (selectedFile) {
      const file = selectedFile

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(),
          sender: 'user',
          text: `📎 ${file.name}`,
        },
      ])

      setSelectedFile(null)
      setIsLoading(true)

      try {
        const formData = new FormData()

        formData.append('image', file)

        const response = await fetch(
          'http://localhost:3000/api/ai/analyze-image',
          {
            method: 'POST',
            body: formData,
          },
        )

        if (!response.ok) {
          throw new Error(
            `Image analysis failed: ${response.status}`,
          )
        }

        const data = await response.json()

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text:
              data.answer ||
              'I could not analyze this image.',
          },
        ])
      } catch (error) {
        console.error(
          'AI image analysis error:',
          error,
        )

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text:
              'I could not analyze the uploaded document. Please try again.',
          },
        ])
      } finally {
        setIsLoading(false)
      }

      return
    }

    /* 
       TEXT MESSAGE
     */

    const userMessage = message.trim()

    if (!userMessage) {
      return
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        sender: 'user',
        text: userMessage,
      },
    ])

    setMessage('')
    setIsLoading(true)

    /* 
       BACKEND AI REQUEST
     */

    try {
      const response = await fetch(
        'http://localhost:3000/api/ai',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            prompt: userMessage,
          }),
        },
      )

      if (!response.ok) {
        throw new Error(
          `AI request failed: ${response.status}`,
        )
      }

      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(
          data.error || 'AI request failed',
        )
      }
      
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text:
            data.answer ||
            'I could not connect to the AI assistant. Please try again later.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  /* 
     FILE SELECTION
   */

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (file) {
      setSelectedFile(file)
    }

    event.target.value = ''
  }

  /* 
     IF ASSISTANT IS CLOSED
   */

  if (!isOpen) {
    return null
  }

  return (
    <aside className="ai-assistant">

      {/* 
          HEADER
       */}

      <header className="ai-header">

        <div className="ai-title">

          <div className="ai-icon">
            ✦
          </div>

          <div>
            <h3>AI Assistant</h3>
            <span>DocuSaarthi</span>
          </div>

        </div>

        <button
          type="button"
          className="ai-close"
          onClick={onClose}
          aria-label="Close AI Assistant"
        >
          ×
        </button>

      </header>


      {/* 
          MESSAGES
       */}

      <div className="ai-messages">

       
       {messages.map((currentMessage) => (
         <div
           key={currentMessage.id}
           className={`ai-message ${currentMessage.sender}`}
         >
           {currentMessage.sender === 'ai' ? (
             <ReactMarkdown>
               {currentMessage.text}
             </ReactMarkdown>
           ) : (
             currentMessage.text
           )}
         </div>
       ))}


        {/* 
            LOADING
         */}

        {isLoading && (

          <div className="ai-message ai">

            <div className="ai-loading">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>

        )}

      </div>


      {/* 
          SELECTED FILE
       */}

      {selectedFile && (

        <div className="selected-ai-file">

          <span>
            📎
          </span>

          <span>
            {selectedFile.name}
          </span>

          <button
            type="button"
            onClick={() =>
              setSelectedFile(null)
            }
            aria-label="Remove selected file"
          >
            ×
          </button>

        </div>

      )}


      {/* 
          INPUT AREA
       */}

      <div className="ai-input-area">

        {/* FILE INPUT */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          hidden
          onChange={handleFileChange}
        />


        {/* ATTACH BUTTON */}

        <button
          type="button"
          className="attach-button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          aria-label="Attach document"
          disabled={isLoading}
        >
          📎
        </button>


        {/* TEXT INPUT */}

        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          disabled={isLoading}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={(event) => {

            if (
              event.key === 'Enter' &&
              !event.shiftKey
            ) {
              event.preventDefault()
              handleSend()
            }

          }}
        />


        {/* SEND BUTTON */}

        <button
          type="button"
          onClick={handleSend}
          aria-label="Send message"
          disabled={
            isLoading ||
            (!message.trim() && !selectedFile)
          }
        >
          ↑
        </button>

      </div>

    </aside>
  )
}

export default AIAssistant