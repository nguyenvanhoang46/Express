const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require('./utils/dbConnect');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRouter');
const commentRoutes = require('./routes/commentRouter');
const authRoutes = require('./routes/authRouter');

const dotenv = require("dotenv")

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', postRoutes);

app.use('/api', categoryRoutes);

app.use('/api', commentRoutes);

app.use('/api', authRoutes);

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});












