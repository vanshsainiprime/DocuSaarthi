# DocuSaarthi

DocuSaarthi is a document assistance platform designed to help users understand, organize, and manage important documents, forms, and service requirements.

It provides tools for document management, requirement discovery, form assistance, document sharing, and AI-powered support through a web-based interface.

## Overview

Dealing with government forms, applications, and document requirements can quickly become confusing. DocuSaarthi aims to simplify this process by bringing relevant document information and assistance together in one place.

The application currently includes:

- Document management
- Document categorization
- Document requirement matching
- Government form information
- Service and requirement discovery
- AI-powered assistance
- Document sharing
- User authentication
- Profile and account management
- Notifications

## Features

### Document Management

Users can manage documents within the application, including viewing, organizing, and categorizing them in one place.

### Requirement Matching

The system compares document requirements with the documents a user already has and helps identify what is missing or still needs to be arranged.

### Forms and Services

DocuSaarthi provides information about forms, services, and their document requirements, with currently supported resources related to Chandigarh and Delhi.

### AI Assistant

The application includes an AI assistant that helps users understand documents, requirements, and related questions through a conversational interface.

### Document Sharing

Users can share documents using generated share links and manage their active sharing links.

### User Accounts

The application supports:

- Account creation
- Login
- Profile management
- Password changes
- Account settings
## Project Structure

```text
DocuSaarthi/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```


## Architecture

```text
                    DocuSaarthi
                         |
          ┌──────────────┴──────────────┐
          |                             |
       Frontend                      Backend
          |                             |
     React + TypeScript             Node.js
          |                             |
          └──────────────┬──────────────┘
                         |
                    API / Services
                         |
          ┌──────────────┴──────────────┐
          |                             |
     Document System              AI Assistant
          |
     Forms & Requirements
```
