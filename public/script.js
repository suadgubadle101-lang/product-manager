// Hämta element från HTML
const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

// 1. Hämta produkter när sidan laddas
document.addEventListener('DOMContentLoaded', fetchProducts);

function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = ''; // Rensa tabellen först
            products.forEach(product => {
                addProductToTable(product);
            });
        })
        .catch(error => {
            console.error('Fel vid hämtning:', error);
            alert('Kunde inte hämta produkter från servern.');
        });
}

// 2. Hantera formuläret (Lägg till produkt)
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra att sidan laddas om

    // Hämta värden från formuläret
    const newProduct = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        sku: document.getElementById('sku').value,
        description: document.getElementById('description').value
    };

    // Skicka till backend
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Kunde inte spara produkten.');
        }
    })
    .then(savedProduct => {
        // Lägg till i tabellen direkt om det lyckades
        addProductToTable(savedProduct);
        
        // Återställ formuläret (töm fälten)
        form.reset();
    })
    .catch(error => {
        console.error('Fel:', error);
        alert('Ett fel uppstod när produkten skulle sparas.');
    });
});

// 3. Funktion för att lägga till en rad i tabellen
function addProductToTable(product) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td>${product.price}</td>
        <td><button class="delete-btn" data-id="${product.id}">🗑️</button></td>
    `;

    // Lägg till klick-lyssnare för radera-knappen
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteProduct(product.id, row));

    productList.appendChild(row);
}

// 4. Radera produkt
function deleteProduct(id, rowElement) {
    if (!confirm('Är du säker på att du vill radera produkten?')) return;

    fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 204) {
            // Ta bort raden från tabellen om backend svarade 204
            rowElement.remove();
        } else {
            throw new Error('Kunde inte radera produkten.');
        }
    })
    .catch(error => {
        console.error('Fel:', error);
        alert('Ett fel uppstod när produkten skulle raderas.');
    });
}