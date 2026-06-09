# Gym Tracker App

A mobile-first, dark-themed gym tracking application built with React, Vite, and Tailwind CSS. 

## Features
- **No Login Required**: Simply select the person lifting from the dashboard.
- **Track Splits**: Choose your daily split (Push, Pull, Leg, Upper, Lower, Rest).
- **Log Exercises & Sets**: Add multiple sets (reps and weight) for each exercise. You can also add custom exercises on the fly.
- **Offline Ready**: Data is saved to your browser's LocalStorage.
- **Activity Feed**: View recent workouts for all friends in the History tab.

## Local Development
To run this project locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment on Netlify
This project includes a `public/_redirects` file to handle React Router client-side routing on Netlify.

1. Connect your GitHub repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

## Future Integration: Firebase / Supabase
To sync data across devices so all 4 users can see each other's live workouts:

### Supabase (Recommended for ease of use)
1. Create a Supabase project.
2. Create a table `workouts` with columns: `id`, `user`, `splitName`, `date`, `exercises` (JSONB).
3. Install the client: `npm install @supabase/supabase-js`
4. Update `src/hooks/useGymData.js` to fetch and insert data from Supabase instead of LocalStorage.

### Firebase
1. Create a Firebase project and enable Firestore.
2. Install the client: `npm install firebase`
3. Initialize Firebase in a `src/firebase.js` file.
4. Update `src/hooks/useGymData.js` to use `addDoc` and `onSnapshot` from Firestore.
