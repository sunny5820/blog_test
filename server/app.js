import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const { MONGO_URI } = config;

mongoose.connect(MONGO_URI, {
    useNewUrlParse: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connecting Success!"))
    .catch((e) => console.log(e));

app.get('/');

export default app;