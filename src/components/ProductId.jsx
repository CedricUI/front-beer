import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import '../styles/productItemId';

function ProductId() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [productItem, setProductItem] = useState(null);

  useEffect(() => {
    // Remplacez l'URL par celle de votre API pour récupérer les détails du produit
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductItem(data);
        console.log(data.product.name);
      })
      .catch((error) => console.error('Error fetching productItem details:', error));
  }, [id]);

  if (!productItem) {
    return <div>Loading...</div>;
  }
  console.log("teste vue : ", productItem.brands);

  return (
    <div>
      <h1>Nom du produit:{productItem.product.name} </h1>
      {productItem.brands.map((productItem) => (
        <div>
          <h2>Nom du produit:{productItem.name} </h2>
        </div>
      ) )}
  </div>

    )
  };

export default ProductId;