export function logIn() {
    const url = `https://api.trinkr.fr/api/v1/cart/add/${id}/${variantId}`;
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Trink ${token}`,
    };
    const data = {
        "quantity": 1,
        "product_variant_id": variantId,
    };
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert("Produit ajouté au panier !");
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Erreur lors de l'ajout au panier !");
    });
}


export function getCart() {
    const url = `https://api.trinkr.fr/api/v1/cart`;
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    fetch(url, {
        method: 'GET',
        headers: headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Erreur lors de la récupération du panier !");
    });
}