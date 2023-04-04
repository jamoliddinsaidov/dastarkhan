# Dastarkhan

Dastarkhan is a web application that enables users to discover and share local food experiences in Uzbekistan. It features a review and rating system, search and filter functions, and user accounts with various features (liking or saving posts, following people, receiving notifications, or recommending food).

## Prerequisites to run the project locally

- Make sure to have Node.js 14+ installed on your device

## Client

- `cd` into the `client` folder
- edit the `.env.example` file with the required keys, and then rename it to `.env`
- run `npm install` to install all the dependency packages
- run `npm run dev` to start the client application locally

If the steps are completed successfully, the web application should be available at `http://127.0.0.1:5173/` or in the URL provided when running the `npm run dev` command.

## Server

- `cd` into the `server` folder
- edit the `.env.example` file with the required keys\*, and then rename it to `.env`
- run `npm install` to install all the dependency packages
- run `npm run dev` to start the server locally

If the steps are completed successfully, the server should be available at port `3000` or whatever the port you have provided in the `.env` file.

\* some of the keys should acquired from [MongoDB](https://www.mongodb.com/) and [Cloudinary](https://cloudinary.com/) to run the server fully, otherwise you will face errors.
