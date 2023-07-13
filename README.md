# CoffeePot

This is a simple web application made to run on a small device, such as a Raspberry pi. It serves a simple page with one function: to track when Coffee was last made. 

# Quick start

## Frontend - Vite + React
Before the frontend could be run the environment varialbe needs to be set. Create a .env file in the Front/ directory. Add the following line to the .env file (replace 127.0.0.1 with your backend address, if not using localhost):

VITE_BACKEND_ADDRESS=127.0.0.1

### Run Frontend
cd Front/
npm install
npm run dev

## Backend - Node.js
No environment variables are needed for the backend.

### Run Backend
cd Back/
npm install
node backend.js
