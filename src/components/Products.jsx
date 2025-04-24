import Header from "./header";
import ProductCard from "./ProductCart";

function Products() {
  return (
    <>
        <Header/>
        <div className="products">
        <h2>Products</h2>
        <p>Here are some of our products.</p>
        <ProductCard /> 
    </div>
        
    </>
    
  );
}

export default Products;