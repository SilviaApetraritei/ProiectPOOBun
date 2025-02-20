const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());

const BOOKS_FILE = 'books.json';

// Citire cărți
app.get('/books', (req, res) => {
    fs.readFile(BOOKS_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Eroare la citirea fișierului' });
        res.json(JSON.parse(data));
    });
});

// Adăugare carte
app.post('/books', (req, res) => {
    const newBook = req.body.title;
    fs.readFile(BOOKS_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Eroare la citire' });

        const books = JSON.parse(data);
        books.push(newBook);
        
        fs.writeFile(BOOKS_FILE, JSON.stringify(books), err => {
            if (err) return res.status(500).json({ error: 'Eroare la scriere' });
            res.status(201).json({ message: 'Carte adăugată' });
        });
    });
});

app.listen(PORT, () => console.log(`Serverul rulează pe http://localhost:${PORT}`));

