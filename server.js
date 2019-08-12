const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRouter = require("./routers/userRoute");

const app = express();
// Middlewares
app.use(morgan('dev')); //For logging
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users/', userRouter);

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to application"
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
    mongoose.connect('mongodb://localhost/mm-app', { useNewUrlParser: true }, () => {
        console.log("DB connected");
    });
});