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
      })
      .catch((error) => console.error('Error fetching productItem details:', error));
  }, [id]);

  if (!productItem) {
    return <div>Loading...</div>;
  }
  console.log("teste vue : ", productItem);


  const handleVariantClick = (productVariant) => {
    for (let i = 0; i < productItem.product.product_variants.length; i++) {
      const variantId = productItem.product.product_variants[i].id;
      console.log("le variantId : ", variantId);

      if (productVariant.id === variantId) {
        console.log("le product Variant : ", productVariant.id);
        document.getElementById(productVariant.id).style.display = 'block';
      } else {
        document.getElementById(productItem.product.product_variants[i].id).style.display = 'none';
      }
    }
  };

  return (
    <div>
      <img src={productItem.product.image} alt={productItem.product.name} />
      <h1>{productItem.product.name} <span>Une bière d'une force à {productItem.product.alcohol_degree} % d'Alc</span></h1>

      {productItem.product.product_variants.map((productVariant) => (
        <div key={productVariant.id}>

          <div id={productVariant.id} style={{ display: 'block' }}>
            <span>{productVariant.price_without_tax / 100} € - </span>
            <span>
              {productVariant.available 
                ? `Stock ${productVariant.stock_quantity}` 
                : 'La soif était trop grande !'}
            </span>
          </div>

          <button onClick={() => handleVariantClick(productVariant)}>
            {productVariant.volume}
          </button>
        </div>
      ))}

      <h2>Description :</h2>
      <p>{productItem.product.description}</p>
      
      {productItem.brands.map((brand) => (
        <div key={brand.id}>
          <h3> <img src={brand.logo} alt={brand.name} /> {brand.name} </h3>
          <p>{brand.description}</p>
        </div>
      ))}
    </div>
  );
  };

export default ProductId;