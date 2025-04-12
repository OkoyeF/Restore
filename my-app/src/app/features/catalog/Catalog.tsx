import { Product } from "../../module/products"
import ProductList from "./ProductList";
import { useEffect, useState } from "react";


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

      useEffect(() => {
          console.log("Starting fetch...");
          fetch('http://localhost:5086/api/products')
              .then(response => response.json())
              .then(data => setProducts(data));
      }, []);
  
  return (
    <>
      <ProductList products={products} />
    </>
  )
}
