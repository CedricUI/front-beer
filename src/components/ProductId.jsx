import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import '../styles/productId';

function ProductId() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Remplacez l'URL par celle de votre API pour récupérer les détails du produit
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <div className="product-details">
        <h2>Nom du produit: {product.name}</h2>
        {/* <p>Prix: {product.product_variants[0]?.price_without_tax / 100}€</p> */}
        {/* <p>Description: {product.description}</p>
        <p>Catégorie: {product.category}</p> */}
        {/* <p>Disponibilité: {product.product_variants[0]?.available ? 'En stock' : 'Indisponible'}</p> */}
      </div>
    </div>
  );
}

export default ProductId;