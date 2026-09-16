require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./src/config/db");
const register = require("./src/routes/user.routes");

const port = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use('/api/auth', register);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});