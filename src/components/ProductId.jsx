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
  console.log("teste vue : ", productItem);
  console.log("productVariants volume : ", productItem.product.product_variants[0].volume);

  return (
    <div>
      <img src={productItem.product.image} alt={productItem.product.name} />
      <h1>{productItem.product.name}</h1>

      {productItem.product.product_variants.map((productItem) => (
        <div>
          <span>{productItem.volume} - </span>
          <span>{productItem.price_without_tax / 100} € </span>
          <span>{productItem.available ? '' : 'La soif était trop grande !'}</span>

        </div>
      ) )}


      <h2>Description :</h2>
      <p>{productItem.product.description}</p>
      
      
      {productItem.brands.map((productItem) => (
        <div>
          <h3>{productItem.name} </h3>
          <p>{productItem.description}</p>
        </div>
      ) )}
  </div>

    )
  };

export default ProductId;