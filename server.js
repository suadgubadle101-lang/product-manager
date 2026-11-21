const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importerar vår databasanslutning

const app = express();
const PORT = 3000;

// Middleware för att kunna läsa JSON och tillåta anrop från webbläsaren
app.use(cors());
app.use(express.json());

// Gör så att vi kan visa filerna i "public"-mappen (HTML, CSS, JS)
app.use(express.static('public'));

// 1. READ (Hämta alla produkter)
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // Skickar tillbaka alla produkter som JSON
    });
});

// 2. CREATE (Lägg till en ny produkt)
app.post('/api/products', (req, res) => {
    const { name, price, sku, description } = req.body;
    
    const sql = 'INSERT INTO products (name, price, sku, description) VALUES (?, ?, ?, ?)';
    const params = [name, price, sku, description];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Status 201 Created (Enligt wireframen!)
        res.status(201).json({ 
            id: this.lastID, 
            name, 
            price, 
            sku, 
            description 
        });
    });
});

// 3. DELETE (Radera en produkt)
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';

    db.run(sql, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Produkten hittades inte" });
        }
        // Status 204 No Content (Enligt wireframen!)
        res.status(204).send();
    });
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});