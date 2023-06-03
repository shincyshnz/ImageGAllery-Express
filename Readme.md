# Image Gallery

An Image Gallery built with React,NodeJs and Multer. At the server side used the concept of middleware nad express routers. The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests. In this project both GET and POST are handled inside the 'routes/imageGallery.js'. The User-Info is logged using application specific middleware.

## Technologies Used

- React
- NodeJs- Multer
- Express
- Middleware - cors (Application Specific middleware)

## Installation Guide

### Client side

```
npm create vite@latest Client
cd Client
npm install
npm install axios
npm install react-router-dom
npm run dev
```

### Server side

Inside Folder Server

```
npm init
npm install nodemon -D
npm i express
npm i cors
npm i multer
```

- Install NodeJs
- Install npm: `npm init`
- Install Nodemon:`npm install nodemon -D`
- Install Express:`npm install express`
- Install Cors:`npm install cors`
- Install Multer:`npm install multer`
- Go to `package.json` and rewrite the scripts as

  ```
  "scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
  }`

  ```

- Start the server: `npm run dev`

#### Note:Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

![alt text](./ProjectImage.png "Image Gallery Front End")
