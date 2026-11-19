const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Skapa eller öppna databasen
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Fel vid anslutning till databasen:", err.message);
    } else {
        console.log("Ansluten till SQLite-databasen.");
        
        // Läs in SQL-filen och kör den för att skapa tabellen
        const sql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
        db.exec(sql, (err) => {
            if (err) {
                console.error("Fel vid skapande av tabell:", err.message);
            } else {
                console.log("Tabellen 'products' är redo.");
            }
        });
    }
});

module.exports = db;