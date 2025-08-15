# Local Food Waste Reduction Platform – Client

## Website Name - FoodLink

## Live Site
[🔗 Live Site URL](https://food-donation-46a3e.web.app/)

## Admin Login
- **Email:** shaida@gmail.com
- **Password:** A@1234

## Overview
This is the frontend (React) of the Local Food Waste Reduction Platform. It provides a user-friendly interface for Users, Charities, Restaurants, and Admins to interact with donations, manage roles, and perform tasks based on their access levels.

## Tech Stack
- React
- React Router
- Tailwind CSS
- TanStack Query (React Query)
- Firebase Authentication
- Stripe (for payments)
- Axios
- SweetAlert2 & React Toastify
- Recharts

## Features
- 🔒 Role-based authentication & private routing
- 🏠 Responsive Home Page with Featured Donations, Latest Requests & Impact Stats
- 🍽️ All Donations Page for browsing verified food donations
- 🔍 Donation Details Page with save/request/review functionality
- ⭐ Save to Favorites & View My Favorites
- 💳 Stripe integration for Charity Role requests
- 📅 View transaction history of Charity role payments
- 📦 Restaurant dashboard to add, update, delete and manage donations
- 📝 Charity dashboard to request, pick up, confirm & review donations
- 👩‍💼 Admin dashboard to manage users, donations, role requests & charity requests
- 📊 Responsive design for all devices


### 🚀 Getting Started

To get the project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/swarnacse19/Food-link-client-side.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Food-link-client-side
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Create a `.env` file:**
    In the root of the project, create a file named `.env` and add your Firebase, Stripe, and any other necessary API keys.
    ```env
    VITE_API_KEY=your_firebase_api_key

5.  **Run the project:**
    Start the development server with this command:
    ```bash
    npm run dev
    ```

The project will now be live at `http://localhost:5173`.
