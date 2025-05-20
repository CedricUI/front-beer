import { Link } from 'react-router-dom';
import "../styles/product-card.css";
import priceWithTax from "../js/priceWithTax";

function ProductCard({ beers }) {
    return (
        <div className="product-cards-container">
            {(!beers || beers.length === 0) ? (
                <div className="loading">Aucun produit trouvé...</div>
            ) : (
                <div className="product-cards">
                    {beers.map((product, index) => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <div
                                className="product-card"
                                key={`${product.name}-${index}`}
                                style={{
                                    filter: product.product_variants[0]?.available ? 'grayscale(0%)' : 'grayscale(80%)',
                                    cursor: product.product_variants[0]?.available ? 'pointer' : 'not-allowed'
                                }}
                            >
                                <img src={product.image} alt={product.name} />
                                <div className="product-card-description">
                                    <h3>{product.name}</h3>
                                    <div>
                                        <span className="category">{product.category} </span>
                                        <span>
                                            {priceWithTax(
                                                product.product_variants[0]?.price_without_tax,
                                                product.product_variants[0]?.tax_amount
                                            )} €
                                        </span>
                                    </div>
                                    <span className='volume-alc-info'>{product.product_variants[0]?.volume} - {product.alcohol_degree}°Alc</span>
                                    <button>Voir le produit</button>
                                </div>
                                <div
                                    className="availability"
                                    style={{
                                        backgroundColor: product.product_variants[0]?.available ? '' : 'red',
                                        color: 'white'
                                    }}
                                >
                                    {product.product_variants[0]?.available ? '' : 'On a adoré Trinker avec ! 🥴'}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductCard;