const express = require('express');
const fs = require('fs');
const db = require('./db/db.json');
const app = express();
const path = require('path');

const PORT = 'https://bryans-note-taker.herokuapp.com/';

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Handling writing Notes
app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    req.body.id = db.length;
    const newNote = req.body;
    db.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db, null, 2));
    res.json(newNote);
}
);

//API routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);