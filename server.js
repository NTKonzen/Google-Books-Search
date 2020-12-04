const express = require('express')
const app = express();
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build/')))
} else {
    app.use(express.static(path.join(__dirname, '/client/public')))
}

const PORT = process.env.PORT || 3001;

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})