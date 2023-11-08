const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app=express()
const UserRoutes = require("./routes/UserRoutes")
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: ["https://flixxit-sable.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json())


mongoose
  .connect("mongodb+srv://kawalsingh32000:55991137@flixxit.kkpcwxd.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user" , UserRoutes)

app.listen(PORT , console.log("server is running!"))
