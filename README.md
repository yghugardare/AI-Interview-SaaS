# 🌟 AI Mock Interview SaaS 🌟

Welcome to the **AI Mock Interview SaaS**, your personal AI-powered interview coach! This web app integrates the cutting-edge Google Gemini AI model API to simulate real interview scenarios, helping you to sharpen your skills and get ready for your dream job.

Link - https://ai-interview-saas-yashdg.vercel.app/

## 🚀 Features

- **AI-Generated Questions**: Enter your job role, description, and years of experience to get tailored interview questions.
- **Live Interview Simulation**: Turn on your microphone and webcam to answer questions just like in a real interview.
- **Speech-to-Text Conversion**: Your responses are converted from speech to text for analysis.
- **AI Feedback and Rating**: Get instant feedback, a rating out of 5, and sample responses for improvement.
- **Data Storage**: All information is stored in the database, allowing you to review and track your progress anytime.

## 🛠 Tech Stack

- **Frontend**: TypeScript, Next.js 14, Shadcn UI, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL, Drizzle ORM

## 🎉 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yghugardare/AI-Interview-SaaS
    cd ai-mock-interview-saas
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add your environment variables.

    ```plaintext
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
    CLERK_SECRET_KEY=your-key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_DRIZZLE_DB_URL=postgresql://yourdblink
    NEXT_PUBLIC_GEMINI_API_KEY=your-api
    ```

4. **Run database migrations**

    ```bash
    npm run db:push
    ```

5. **Start the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see your app in action.

## 📚 Usage

1. **Sign up / Log in**: Authenticate using Clerk.
2. **Enter Details**: Provide your job role, description, and years of experience.
3. **Start Interview**: Answer the AI-generated questions with your microphone and webcam on.
4. **Get Feedback**: Receive detailed feedback, rating, and sample responses.
5. **Review**: Access your past interview data anytime to monitor your progress.

## 🤖 AI Integration

The app uses Google Gemini AI to generate interview questions and provide feedback. The AI analyzes your speech-to-text converted responses to give you constructive feedback and a rating out of 5.

## 🗂 Database

The app uses Neon PostgreSQL with Drizzle ORM to store all user data, ensuring efficient and secure access to your interview history.

## 🛡 Authentication

User authentication is handled by Clerk, providing secure and seamless sign-up and log-in processes.

## 🎨 UI/UX

Styled with Tailwind CSS and Shadcn UI, the app offers a modern and intuitive interface for the best user experience.





---

Feel free to explore, use, and contribute to this project. Happy interviewing! 🚀

