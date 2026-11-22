# Product Manager

En fullstack-webbapplikation för att hantera produkter. Applikationen är byggd med Node.js, Express och SQLite på backend, samt HTML, CSS och JavaScript på frontend.

## Funktioner
- Skapa: Lägg till nya produkter via ett formulär med inbyggd HTML-validering.
- Läsa: Visa alla produkter i en dynamisk tabell.
- Radera: Ta bort produkter direkt från tabellen.
- Felhantering: Användaren får ett felmeddelande om ett API-anrop misslyckas.

## Tekniker
- Backend: Node.js, Express.js
- Databas: SQLite (skapas automatiskt via database.sql)
- Frontend: HTML5, CSS3, JavaScript (Fetch API)

## Förutsättningar
För att köra projektet krävs att Node.js är installerat på datorn. Detta kan laddas ner från nodejs.org.

## Installation och start
Följ dessa steg för att starta applikationen lokalt:

1. Klona projektet eller ladda ner ZIP-filen och öppna mappen i terminalen.
2. Installera alla beroenden:
   npm install
3. Starta servern:
   node server.js
   (När servern startar skapas databasen database.db och tabellen products automatiskt om de inte redan finns).
4. Öppna applikationen i webbläsaren:
   http://localhost:3000

## API-endpoints
Applikationen har följande endpoints:
- GET /api/products - Hämtar alla produkter.
- POST /api/products - Lägger till en ny produkt.
- DELETE /api/products/:id - Raderar en specifik produkt.

## Projektstruktur
product-manager/
├── public/               # Frontend-filer (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── database.sql          # SQL-schema för att skapa tabellen
├── db.js                 # Databaskoppling (SQLite)
├── server.js             # Express-server och API-rutter
├── README.md             # Denna fil
└── package.json          # Projektets beroenden