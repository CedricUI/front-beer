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

function ProductCard () {
    return (
            <div className="product-cards-container">
                {products.map((product, index) => 
                ( 
                <div className="product-card" key={`${product.name}-${index}`}>
                        {/* <img src={} alt={}> */}
                        <h3>{ product.name }</h3>
                        <span className="category">{ product.category }</span>
                        <span>{ product.price } €</span>
                        <ShowProduct />
                </div>))}
            </div>
        
    )
};

export default ProductCard;