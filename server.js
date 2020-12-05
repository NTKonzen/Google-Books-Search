const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build/')))
} else {
    app.use(express.static(path.join(__dirname, '/client/public')))
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooksearch", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})