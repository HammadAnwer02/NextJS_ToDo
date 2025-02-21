# Next.js To-Do Application

A full-stack To-Do application built with Next.js, PostgreSQL, Prisma, NextAuth, and TailwindCSS. This application supports user authentication via Google and credentials, allowing authenticated users to create, edit, and delete to-dos. The app is deployed on Vercel and uses a Heroku PostgreSQL database for production.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Database Setup with Heroku](#database-setup-with-heroku)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **User Authentication:**  
  - Sign in using Google or credentials (NextAuth).
  - Secure session management with JWT.

- **To-Do Management:**  
  - Create, edit, and delete to-dos.
  - Real-time updates without page refresh.
  - Protected dashboard accessible only to authenticated users.

- **Responsive Design:**  
  - Styled with TailwindCSS for mobile, tablet, and desktop views.

- **Database Integration:**  
  - Uses PostgreSQL managed via Prisma ORM.
  - Migrations and schema management handled with Prisma.

- **Deployment:**  
  - Deployed on Vercel.
  - Production database hosted on Heroku Postgres.

## Technologies Used

- **Frontend:** Next.js (App Router), React, TailwindCSS
- **Backend:** Next.js API routes, NextAuth.js
- **Database:** PostgreSQL, managed via Heroku
- **ORM:** Prisma
- **Authentication:** NextAuth (Google provider & credentials)
- **Deployment:** Vercel

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (for database provisioning)
- A Heroku account (for PostgreSQL database)
- A Vercel account (for deployment)
- Google OAuth credentials for authentication

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
