import { useState, useEffect } from "react";
import "../styles/product-card.css";
import ShowProduct from "./ShowProduct.jsx";

const products = [
    {
        name: 'Triple Karmeliet',
        price: 6.00,
        category: 'Ambrée',
        isAvailable: true,
    },
    {
        name: 'Leffe Rituel',
        price: 5.30,
        category: 'Ambrée',
        isAvailable: true,
    },
    {
        name: 'Adelscott',
        price: 4.80,
        category: 'Ambrée',
        isAvailable: true,
    },
    {
        name: 'Bière de Noël',
        price: 7.50,
        category: 'Blonde',
        isAvailable: false,
    }
]

function ProductCard() {
    const [showProduct, setShowProduct] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products?page=' + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                setShowProduct(data);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, [page]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (showProduct && showProduct.products.next_page_url) {
            setPage(page + 1);
        }
    };

    return (
        <div className="product-cards-container">
            {showProduct === null ? <div className="loading">Loading...</div> : (
                <>
                <div className="product-cards">
                {showProduct.products.data.map((product, index) =>
                    (
                        <div className="product-card" key={`${product.name}-${index}`} style={{ filter: product.product_variants[0]?.available ? 'grayscale(0%)' : 'grayscale(80%)', cursor: product.product_variants[0]?.available? 'pointer' : 'not-allowed' }}>
                            <img src={product.image} alt={product.name} />
                            <div className="product-card-description">
                            {/* {console.log(product.product_variants)} */}
                                <h3>{product.name}</h3>
                                <div>
                                    <span className="category">{product.category} </span>
                                    <span>{product.product_variants[0]?.price_without_tax/100} €</span>
                                </div>
                                <ShowProduct />
                            </div>
                            <div className="availability" style={{ backgroundColor: product.product_variants[0]?.available ? '' : 'red', color: 'white' }}>{product.product_variants[0]?.available ? '' : 'On a adoré Trinker avec !'}</div>
                        </div>
                        )
                    )}
                </div>
                    
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={page === 1}>
                            Précédent
                        </button>
                        <span>Page {page}</span>
                        <button onClick={handleNextPage} disabled={!showProduct.products.next_page_url}>
                            Suivant
                        </button>
                    </div>
                </>
            )}

        </div>
    )
};

export default ProductCard;