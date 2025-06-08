# Movie List

This is a web application designed to store, view, add, delete, and import movies from a text file. The application allows you to search for movies by title or actor, and also sort the list of movies alphabetically.

## Project architecture

📁 public/
┣ 📁 api/
┣ 📁 images/
┗ index.html

📁 src/
┣ 📁 app/
┃ ┣ hooks.ts
┃ ┗ store.ts

┣ 📁 components/

┣ 📁 features/
┃ ┗ getMoviesSlice.ts
┣ ┗ selectors.ts

┣ 📁 types/
┃ ┗ Movie.ts # Типи (інтерфейси) фільмів

┣ App.tsx
┗ main.tsx

## Technologies

- TypeScript
- React
- Redux

## Setup Instructions

- git clone https://github.com/your-username/your-repo-name.git
- cd your-repo-name
- npm install
- npm start
- Open http://localhost:3000 in your browser.
