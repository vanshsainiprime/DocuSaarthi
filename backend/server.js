import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'
import multer from 'multer'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import docusaarthiKnowledge from './data/docusaarthiKnowledge.js'


const app = express()

app.use(cors())
app.use(express.json())

// PATHS

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsDirectory = path.join(
  __dirname,
  'uploads',
)

const dataDirectory = path.join(
  __dirname,
  'data',
)

const sharesFile = path.join(
  dataDirectory,
  'shares.json',
)
const usersFile = path.join(
  dataDirectory,
  'users.json',
)


fs.mkdirSync(uploadsDirectory, { recursive: true })
fs.mkdirSync(dataDirectory, { recursive: true })

if (!fs.existsSync(sharesFile)) {
  fs.writeFileSync(sharesFile, '[]')
}

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]')
}
app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Name, email and password are required',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        error:
          'Password must be at least 6 characters',
      })
    }

    const users = readUsers()

    const normalizedEmail =
      email.trim().toLowerCase()

    const existingUser = users.find(
      (user) =>
        user.email === normalizedEmail,
    )

    if (existingUser) {
      return res.status(409).json({
        error: 'An account with this email already exists',
      })
    }

    const passwordHash =
      await bcrypt.hash(password, 12)

    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    users.push(user)

    writeUsers(users)

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error(
      'Registration error:',
      error,
    )

    res.status(500).json({
      error: 'Could not create account',
    })
  }
})

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      })
    }

    const users = readUsers()

    const normalizedEmail =
      email.trim().toLowerCase()

    const user = users.find(
      (item) =>
        item.email === normalizedEmail,
    )

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.passwordHash,
      )

    if (!passwordMatches) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(
      'Login error:',
      error,
    )

    res.status(500).json({
      error: 'Could not log in',
    })
  }
})

// CHANGE PASSWORD

app.post('/api/auth/change-password', async (req, res) => {
  try {
    const {
      userId,
      currentPassword,
      newPassword,
    } = req.body

    if (
      !userId ||
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        error:
          'User ID, current password and new password are required',
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error:
          'New password must be at least 6 characters',
      })
    }

    const users = readUsers()

    const user = users.find(
      (item) => item.id === userId,
    )

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    const passwordMatches =
      await bcrypt.compare(
        currentPassword,
        user.passwordHash,
      )

    if (!passwordMatches) {
      return res.status(401).json({
        error: 'Current password is incorrect',
      })
    }

    const newPasswordHash =
      await bcrypt.hash(newPassword, 12)

    user.passwordHash = newPasswordHash

    writeUsers(users)

    res.json({
      message:
        'Password changed successfully',
    })
  } catch (error) {
    console.error(
      'Change password error:',
      error,
    )

    res.status(500).json({
      error:
        'Could not change password',
    })
  }
})

 
// GEMINI AI
 

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

 
// MULTER
 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory)
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${crypto.randomUUID()}-${file.originalname}`

    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

 
// HELPERS
 
function getLocalAnswer(prompt) {
  const question = prompt.toLowerCase().trim()

  // Who are you?
  if (
    question.includes('who are you') ||
    question.includes('your name')
  ) {
    return 'I am the **DocuSaarthi AI Assistant**.'
  }

  // What is DocuSaarthi?
  if (
    question.includes('what is docusaarthi') ||
    question.includes('what does docusaarthi do')
  ) {
    return (
      `## What is DocuSaarthi?\n\n` +
      `${docusaarthiKnowledge.about.description}\n\n` +
      `**Purpose:** ${docusaarthiKnowledge.about.purpose}`
    )
  }

  // Why was DocuSaarthi made?
  if (
    question.includes('why was docusaarthi made') ||
    question.includes('why docusaarthi') ||
    question.includes('purpose of docusaarthi')
  ) {
    return (
      `## Why DocuSaarthi?\n\n` +
      `${docusaarthiKnowledge.about.purpose}`
    )
  }

  // Services
  if (
    question.includes('what services') ||
    question.includes('available services') ||
    question.includes('services available')
  ) {
    const services =
      docusaarthiKnowledge.services
        .map((service) => `- **${service.name}**`)
        .join('\n')

    return `## Available Services\n\n${services}`
  }

  // Forms
  if (
    question.includes('what forms') ||
    question.includes('available forms') ||
    question.includes('forms available')
  ) {
    const forms =
      docusaarthiKnowledge.forms
        .map((form) => `- **${form.name}**`)
        .join('\n')

    return `## Available Forms\n\n${forms}`
  }

  // Documents
  if (
    question.includes('what can i do with my documents') ||
    question.includes('manage my documents') ||
    question.includes('document management')
  ) {
    const actions =
      docusaarthiKnowledge.documents.actions
        .map((action) => `- ${action}`)
        .join('\n')

    return `## Managing Your Documents\n\nYou can:\n\n${actions}`
  }

  // Nothing matched
  return null
}

function readShares() {
  const data = fs.readFileSync(
    sharesFile,
    'utf-8',
  )

  return JSON.parse(data)
}

function writeShares(shares) {
  fs.writeFileSync(
    sharesFile,
    JSON.stringify(shares, null, 2),
  )
}
function readUsers() {
  const data = fs.readFileSync(
    usersFile,
    'utf-8',
  )

  return JSON.parse(data)
}

function writeUsers(users) {
  fs.writeFileSync(
    usersFile,
    JSON.stringify(users, null, 2),
  )
}


 
// HOME
 

app.get('/', (req, res) => {
  res.send('DocuSaarthi AI backend is running')
})

 
// AI
 


app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required',
      })
    }

    const localAnswer = getLocalAnswer(prompt)

    if (localAnswer) {
      return res.json({
        answer: localAnswer,
        source: 'docusaarthi',
      })
    }

    const systemPrompt = `
You are the DocuSaarthi AI Assistant.

You are the built-in AI assistant of the DocuSaarthi application.

  
ABOUT DOCUSAARTHI
  

DocuSaarthi is a digital assistant designed to help users
understand and manage documents, government services, and
application paperwork.

The goal of DocuSaarthi is to make complicated paperwork
easier to understand and navigate.

When explaining DocuSaarthi, describe THIS application.
Do not confuse it with another company, product, or
document-processing platform.

  
AVAILABLE SERVICES
  

Currently available services in DocuSaarthi are:

1. OBC Certificate
2. Bank Account
3. PAN Card

If the user asks about available services, mention only
these services.

Do not invent additional services.

  
AVAILABLE FORMS
  

Currently available forms include:

1. Chandigarh Forms
2. Delhi Forms

If the user asks about available forms, mention only
these forms.

Do not invent additional forms.

  
MY DOCUMENTS
  

Users can manage their documents through DocuSaarthi.

Currently supported document management actions include:

- Upload documents
- Rename documents
- Categorize documents
- Delete documents
- Share documents

Do not claim that DocuSaarthi supports features that are
not listed here.

  
AI ASSISTANT
  

You can help users:

- Understand documents
- Explain government services
- Explain application forms
- Explain document requirements when known
- Answer questions about DocuSaarthi
- Analyze uploaded documents or images when they are provided
- Explain extracted information in simple language

  
IMPORTANT BEHAVIOUR
  

If the user asks:

"Who are you?"

Answer:

"I am the DocuSaarthi AI Assistant."

If the user asks:

"What is DocuSaarthi?"

Explain DocuSaarthi as the application described above.

If the user asks:

"Why was DocuSaarthi made?"

Explain that DocuSaarthi was created to make documents,
government services, forms, and paperwork easier for users
to understand and manage.

If the user asks:

"What services are available?"

Give the current DocuSaarthi services:

- OBC Certificate
- Bank Account
- PAN Card

If the user asks:

"What forms are available?"

Give:

- Chandigarh Forms
- Delhi Forms

If the user asks:

"What can I do with my documents?"

Explain:

- Upload
- Rename
- Categorize
- Delete
- Share

  
ANSWER STYLE
  

Be concise, friendly, and useful.

Prefer short answers over unnecessary long explanations.

Use Markdown when it improves readability.

Use headings, bullet points, numbered lists, and bold text
when appropriate.

Do not output raw Markdown syntax unnecessarily.

Do not use fake information.

Do not invent features, services, forms, requirements,
government departments, or capabilities.

If information is not available in your DocuSaarthi knowledge,
say that clearly instead of guessing.

When the user asks a general question unrelated to DocuSaarthi,
you may answer normally, but keep the answer concise.

When the user asks about DocuSaarthi, prioritize the
DocuSaarthi information above.
`
    
    
    const interaction = await ai.interactions.create({
      model: 'gemini-3.6-flash',
      system_instruction: systemPrompt,
      input: prompt,
    })


    

    res.json({
      answer: interaction.output_text,
    })
  } catch (error) {
    console.error('Gemini error:', error)
  
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'AI request failed'
  
    if (
      errorMessage.includes('429') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('Too Many Requests')
    ) {
      return res.status(429).json({
        error:
          'AI usage limit reached. Please try again later.',
      })
    }
  
    res.status(500).json({
      error: errorMessage,
    })
  }
})
 
// AI IMAGE ANALYSIS
 

app.post(
  '/api/ai/analyze-image',
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Image is required',
        })
      }

      const imageBuffer = fs.readFileSync(
        req.file.path,
      )

      const base64Image =
        imageBuffer.toString('base64')

      const systemPrompt = `
You are the DocuSaarthi AI Assistant.

You are analyzing an image uploaded by a user
inside the DocuSaarthi application.

Your job is to help the user understand documents
and forms.

When analyzing an image:

- Identify what type of document or form it appears to be.
- Explain what is clearly visible.
- Extract useful visible information when appropriate.
- If it is a form, explain the fields and what they ask for.
- Point out information that appears missing or unclear.
- Never invent information that cannot be seen.
- If you are unsure, clearly say so.
- Do not claim a document is authentic or legally valid
  based only on an image.

Use simple language.
Be concise but useful.
Use Markdown when appropriate.
`

      
      const interaction =
        await ai.interactions.create({
          model: 'gemini-3.6-flash',
      
          system_instruction:
            systemPrompt,
      
          input: [
            {
              type: 'text',
              text:
                'Analyze this document image and explain what you can see.',
            },
            {
              type: 'image',
              data: base64Image,
              mime_type: req.file.mimetype,
            },
          ],
        })

      if (
        req.file.path &&
        fs.existsSync(req.file.path)
      ) {
        fs.unlinkSync(req.file.path)
      }

      res.json({
        answer: interaction.output_text,
      })
    } catch (error) {
      console.error(
        'AI image analysis error:',
        error,
      )

      if (
        req.file?.path &&
        fs.existsSync(req.file.path)
      ) {
        fs.unlinkSync(req.file.path)
      }

      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Image analysis failed',
      })
    }
  },
)

 
// CREATE SHARE LINK
 

app.post(
  '/api/shares',
  upload.array('documents', 10),
  (req, res) => {
    try {
      const files = req.files

      if (!files || files.length === 0) {
        return res.status(400).json({
          error: 'No documents were uploaded',
        })
      }

      const expiresInDays =
        Number(req.body.expiresInDays) || 7

      const token = crypto.randomBytes(32).toString('hex')

      const now = new Date()

      const expiresAt = new Date(
        now.getTime() +
          expiresInDays *
            24 *
            60 *
            60 *
            1000,
      )

      const sharedFiles = files.map((file) => ({
        id: crypto.randomUUID(),
        originalName: file.originalname,
        storedName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
      }))

      const share = {
        id: crypto.randomUUID(),
        token,
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        revoked: false,
        files: sharedFiles,
      }

      const shares = readShares()

      shares.push(share)

      writeShares(shares)

      res.status(201).json({
        id: share.id,
        token: share.token,
        expiresAt: share.expiresAt,
        shareUrl:
          `http://localhost:5173/share/${share.token}`,
        files: share.files.map((file) => ({
          name: file.originalName,
          type: file.mimeType,
          size: file.size,
        })),
      })
    } catch (error) {
      console.error('Create share error:', error)

      res.status(500).json({
        error: 'Could not create share link',
      })
    }
  },
)

 
// GET ACTIVE SHARE LINKS
 

app.get('/api/shares', (req, res) => {
  try {
    const shares = readShares()

    const now = new Date()

    const activeShares = shares.filter(
      (share) =>
        !share.revoked &&
        new Date(share.expiresAt) > now,
    )

    res.json(
      activeShares.map((share) => ({
        id: share.id,
        token: share.token,
        createdAt: share.createdAt,
        expiresAt: share.expiresAt,
        shareUrl:
          `http://localhost:3000/share/${share.token}`,
        files: share.files.map((file) => ({
          name: file.originalName,
          type: file.mimeType,
          size: file.size,
        })),
      })),
    )
  } catch (error) {
    console.error('Get shares error:', error)

    res.status(500).json({
      error: 'Could not load share links',
    })
  }
})

 
// REVOKE SHARE LINK
 

app.delete(
  '/api/shares/:id',
  (req, res) => {
    try {
      const shares = readShares()

      const share = shares.find(
        (item) => item.id === req.params.id,
      )

      if (!share) {
        return res.status(404).json({
          error: 'Share link not found',
        })
      }

      share.revoked = true

      writeShares(shares)

      res.json({
        message: 'Share access revoked',
      })
    } catch (error) {
      console.error('Revoke share error:', error)

      res.status(500).json({
        error: 'Could not revoke share link',
      })
    }
  },
)

 
// VIEW SHARE LINK
 

app.get(
  '/api/shares/token/:token',
  (req, res) => {
    try {
      const shares = readShares()

      const share = shares.find(
        (item) =>
          item.token === req.params.token,
      )

      if (!share) {
        return res.status(404).json({
          error: 'Share link not found',
        })
      }

      if (share.revoked) {
        return res.status(403).json({
          error: 'This share link has been revoked',
        })
      }

      if (
        new Date(share.expiresAt) <=
        new Date()
      ) {
        return res.status(410).json({
          error: 'This share link has expired',
        })
      }

      res.json({
        id: share.id,
        createdAt: share.createdAt,
        expiresAt: share.expiresAt,

        files: share.files.map((file) => ({
          id: file.id,
          name: file.originalName,
          type: file.mimeType,
          size: file.size,
          downloadUrl:
            `/api/shares/token/${share.token}/files/${file.id}`,
        })),
      })
    } catch (error) {
      console.error('View share error:', error)

      res.status(500).json({
        error: 'Could not load shared documents',
      })
    }
  },
)

 
// DOWNLOAD SHARED FILE
 

app.get(
  '/api/shares/token/:token/files/:fileId',
  (req, res) => {
    try {
      const shares = readShares()

      const share = shares.find(
        (item) =>
          item.token === req.params.token,
      )

      if (!share) {
        return res.status(404).json({
          error: 'Share link not found',
        })
      }

      if (share.revoked) {
        return res.status(403).json({
          error: 'This share link has been revoked',
        })
      }

      if (
        new Date(share.expiresAt) <=
        new Date()
      ) {
        return res.status(410).json({
          error: 'This share link has expired',
        })
      }

      const file = share.files.find(
        (item) =>
          item.id === req.params.fileId,
      )

      if (!file) {
        return res.status(404).json({
          error: 'Document not found',
        })
      }

      const filePath = path.join(
        uploadsDirectory,
        file.storedName,
      )

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          error: 'Stored document not found',
        })
      }

      res.download(
        filePath,
        file.originalName,
      )
    } catch (error) {
      console.error(
        'Download shared file error:',
        error,
      )

      res.status(500).json({
        error: 'Could not download document',
      })
    }
  },
)

 
// START SERVER
 

app.listen(3000, () => {
  console.log(
    'DocuSaarthi AI backend running on http://localhost:3000',
  )
})