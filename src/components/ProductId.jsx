import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import '../styles/ProductId.css'; 
import priceWithTax from '../js/priceWithTax';

function ProductId() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [productItem, setProductItem] = useState(null);
  const [selectedProductVariant, setProductVariant] = useState(null); // État pour stocker le produit variant sélectionné
  const [productVariantInputNumber, setProductVariantInputNumber] = useState(null); // État pour stocker le produit variant sélectionné
  useEffect(() => {
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
      const brut = document.getElementsByClassName('brut')[0];
      console.log("le variantId : ", variantId);

      if (productVariant.id !== variantId) {
        document.getElementById(variantId).style.display = 'none';
        
      } else {
        console.log("le product Variant : ", productVariant.id);
        document.getElementById(productVariant.id).style.display = 'flex';
        brut.style.display = 'none';
      }
    }
        setProductVariant(productVariant); // Met à jour l'état avec le produit variant sélectionn

        return productVariant;

  };

  

  console.log("le selectedProductVariant : ", selectedProductVariant);

 const handleAddToCart = (selectedProductVariant, productItem) => {
  // 1. Vérification du variant
  if (!selectedProductVariant) {
    selectedProductVariant = productItem.product.product_variants[0];
    console.log("le selectedProductVariant null : ", selectedProductVariant);
    setProductVariant(selectedProductVariant);
  }

  if (!selectedProductVariant.available) {
    alert("Trop lent, ce produit n'est plus disponible ! 😬 Pour le moment... en cours de fabrication... 🏭");
    return;
  }

  // 2. Vérification de la quantité demandée
  const inputNumber = document.getElementById("stock_quantity");
  const inputValue = parseInt(inputNumber.value, 10);

  if (isNaN(inputValue) || inputValue <= 0) {
    alert("Pourquoi tu commandes rien ! 🤔");
    return;
  }

  if (inputValue > selectedProductVariant.stock_quantity) {
    alert("Ola ! Doucement, on ne pourra pas te fournir autant de marchandise ! ✋😑");
    return;
  }

  // 3. Récupération du token
  const token = Cookies.get('authToken');

  if (!token) {
    alert("Tu dois être connecté pour ajouter au panier. 😅");
    return;
  }

  // 4. Préparation de la requête
  const url = `http://localhost:8000/api/order-items`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const data = {
    product_variant_id: selectedProductVariant.id,
    quantity: inputValue,
  };

  // 5. Envoi de la requête
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(error => { throw new Error(error.message || "Erreur inconnue"); });
      }
      return response.json();
    })
    .then((data) => {
      console.log('Succès ajout panier', data);
      alert("C'est un franc succès ! 👌 Le produit a été ajouté au panier !");
    })
    .catch((error) => {
      console.error('Erreur ajout panier :', error);
      alert("Erreur lors de l'ajout au panier ! 😬 Prends un verre en attendant ! 🥃");
    });
};

  return (
    <div className="product-item-container">
        <div className='product-item-image'>
          <div className='product-item-image-container'>
            < img src={productItem.product.image} alt={productItem.product.name} className='image'/>
            <div className='product-variant-scroll'>
              <div className='product-variants'>
                {productItem.product.product_variants.map((productVariant) => (
                  <div key={productVariant.id} className='product-variant'>
                        <button onClick={() => handleVariantClick(productVariant)}>
                        {productVariant.volume}
                        </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='product-item-image-description'>
            <div className='product-variant-description brut'>
                  <span style={{ textDecorationLine: productItem.product.product_variants[0].available?'' 
                    : 'line-through', color: productItem.product.product_variants[0].available?'' 
                    :'grey' }}>{priceWithTax(productItem.product.product_variants[0].price_without_tax, productItem.product.product_variants[0].tax_amount)} € </span>
                  <span style={{ color: productItem.product.product_variants[0].available?'' 
                    :'red' }}>
                    {productItem.product.product_variants[0].available 
                      ? `Stock ${productItem.product.product_variants[0].stock_quantity}` 
                      : 'La soif était trop grande! 😅'}
                  </span>
            </div>
            {productItem.product.product_variants.map((productVariant) => (
                <div key={productVariant.id} id={productVariant.id} className='product-variant-description'>
                    <span style={{ textDecorationLine: productVariant.available?'' 
                      : 'line-through', color: productVariant.available?'' 
                      :'grey' }}>{priceWithTax(productVariant.price_without_tax, productVariant.tax_amount)} € </span>
                    <span style={{ color: productVariant.available?'' 
                      :'red' }}>
                      {productVariant.available 
                        ? `Stock ${productVariant.stock_quantity}` 
                        : 'La soif était trop grande! 😅'}
                    </span>
                </div>
              ))}
              <section className="product-details">
                <h1>{productItem.product.name} <span>Une bière d'une force à {productItem.product.alcohol_degree} % d'Alc</span></h1>
                <h2>Description :</h2>
                <p>{productItem.product.description}</p>
                {productItem.brands.map((brand) => (
                  <div key={brand.id}>
                    <h3> {brand.name} </h3>
                    <p>{brand.description}</p>
                  </div>
                  
                ))}

                <div className="product-actions">
                <input type="number" name="stock_quantity" min={0} 
                max={selectedProductVariant?.stock_quantity ?? productItem.product.product_variants[0].stock_quantity} 
                defaultValue={0} id="stock_quantity"/>
                
                  <button onClick={() => handleAddToCart(selectedProductVariant, productItem)}>Ajouter au panier</button>
                  <button onClick={() => window.history.back()}>Retour</button>
                </div>

              </section>
          </div>
        </div>
    </div>
  );
  };

export default ProductId;