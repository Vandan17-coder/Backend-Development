require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});