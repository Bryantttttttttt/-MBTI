# Pet MBTI Pro - Vercel Deployment Guide

If you are seeing a white screen after deploying to Vercel, please follow these steps:

## 1. Set Node.js Version to 20+
Tailwind CSS 4 and the latest Vite require Node.js 20 or higher.
- Go to your Vercel Project Settings.
- Under **General**, find **Node.js Version**.
- Select **20.x** or **22.x**.
- Redeploy your app.

## 2. Check Build Settings
Ensure your build settings are as follows:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 3. Environment Variables
If you are using the Gemini AI features, make sure to add your `GEMINI_API_KEY` in the Vercel **Environment Variables** settings.

## 4. SPA Routing
We have included a `vercel.json` file to handle Single Page Application (SPA) routing. This ensures that refreshing the page on a sub-route doesn't lead to a 404 error.

## 5. Full-Stack Setup (Optional)
We have included a `server.ts` file. If you want to use a custom Express backend on Vercel, you may need to configure Vercel to use the `@vercel/node` builder for the `server.ts` file, but for most cases, the static Vite build is sufficient.
