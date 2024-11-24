import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product-page">
      {product ? (
        <>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} />
          <p>{product.price}</p>
          <button>Add to Cart</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductPage;
