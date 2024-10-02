const express = require('express');
const path = require('path');
const fs = require('fs');
//const api = require('./routes/api');

const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // GET Route for homepage
// app.get('/assets/css/styles.css', (req, res) => {
// const css = "body: somecss"
//     return res.status(200).send(css);
// //    return res.sendFile(path.join(__dirname, '/public/assets/css/styles.css'))
// });

/*
 * Website Routes
 */

// GET Route for homepage
app.get('/', (req, res) => {
    console.log("getting homepage");
    return res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.get('/notes', (req, res) => {
    console.log("getting notes page");
    return res.sendFile(path.join(__dirname, '/views/notes.html'))
});

/*
 * API Routes dB
 */
const db = [];
// GET route for existing notes
app.get('/api/notes', (req, res) => {
    console.log("getting notes data");

    const data = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')
    return res.send(data);
})

// POST route to add note
app.post('/api/notes', (req, res) => {
    console.log("posting note");
    console.log("request", req.body);
    db.push(req.body);
    console.log("resfonefe");
    return res.send();
})

app.use(express.static('public'));

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
