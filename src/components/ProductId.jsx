import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/ProductId.css'; // Assurez-vous que le chemin est correct

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
    // Vérifiez si le produitVariant est disponible avant d'ajouter au panier
    if (selectedProductVariant === null || selectedProductVariant === undefined) {
      selectedProductVariant = productItem.product.product_variants[0];
      console.log("le selectedProductVariant null : ", selectedProductVariant);
      setProductVariant(selectedProductVariant);
    }
    if (!selectedProductVariant.available) {
      alert("Trop lent, ce produit n'est plus disponible ! 😬 Pour le moment... en cours de fabrication... 🏭");
      return;
    }

    const inputNumber = document.getElementById("stock_quantity");
    const inputValue = parseInt(inputNumber.value, 10);
    console.log("inputValue : ", inputValue);
    if(inputValue == 0){
      alert("Pourquoi tu commandes rien ! 🤔");
      return;
    }
    if (inputValue > selectedProductVariant.stock_quantity) {
      alert("Ola ! Doucement, on ne pourra pas te fournir autant de marchandise ! ✋😑");
      return;
    }
    
    const url = `https://api.trinkr.fr/api/v1/cart/add/${productItem.product.id}/${selectedProductVariant.id}`;
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const data = {
      product_stock_quantity: inputValue,
      //*************  À remplasser par les bonnes valeurs *************/
      product_variant_id: selectedProductVariant.id,
      product_id: productItem.product.id,
      product_name: productItem.product.name,
      product_image: productItem.product.image,
      product_price: selectedProductVariant.price_without_tax / 100,
      product_volume: selectedProductVariant.volume,
      product_alcohol_degree: productItem.product.alcohol_degree,
      product_description: productItem.product.description,
      product_brand: productItem.brands[0].name,
      product_brand_logo: productItem.brands[0].logo,
      product_brand_description: productItem.brands[0].description,
      product_available: selectedProductVariant.available,
      product_variant_available: selectedProductVariant.available,
      product_variant_stock_quantity: selectedProductVariant.stock_quantity,
    };
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        alert("C'est un franc succé ! 👌 Le produit ajouté au panier !");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Erreur lors de l'ajout au panier ! Ne me regarde pas ! 😬 Je ne sais pas ce qui s'est passé ! Prend un verre en attendant ! 🥃");
      });
  }

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
                    :'grey' }}>{productItem.product.product_variants[0].price_without_tax / 100} € </span>
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
                      :'grey' }}>{productVariant.price_without_tax / 100} € </span>
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
                    <h3> <img src={brand.logo} alt={brand.name} /> {brand.name} </h3>
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