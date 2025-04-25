import Header from "./header";
import ProductCard from "./ProductCard";
import '../styles/products.css';

function Products() {
  return (
    <div className="products-container">
        <Header/>
        <div className="products">
          <h1>Products</h1>
          <p>Here are some of our products.</p>
          <ProductCard /> 
        </div>
    </div>
    
  );
}

export default Products;