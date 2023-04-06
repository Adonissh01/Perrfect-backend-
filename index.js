//entry point 
const express = require("express");
const app = express(); //initialize new application based on express
const DB = require("./database").connectDB; //(refering to it) go to database and take a reference ,we are taking a ref to this fun

//Routes
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const volunteerRouter = require("./routers/volunteerRouter");

//Connect to our db
DB(); //execute it

app.use(express.json()); //JSON request or response just accepted
//here
app.use("/api/user",userRouter);
app.use("/api/volunteer",volunteerRouter);
app.use("/api/post",postRouter);

//the signup path: http://localhost:3000/api/auth/signup


app.listen(process.env.PORT,()=>{ //ANONYMOUS FUN
    console.log(`Listening to port: ${process.env.PORT}`) //${} means paste environment variable
});

//everything that we want the index.js to use we put it UNDER EXPRESS.JSON()

