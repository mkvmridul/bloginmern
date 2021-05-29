const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./config/db");
const cors = require('cors')

const app = express();

dbConnection();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/auth', require('./routes/auth'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
	console.log(`app is listening to PORT ${PORT}`)
})
