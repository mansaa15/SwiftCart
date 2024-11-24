import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import '../adminpage.css';

function AdminPage() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(""); 
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionSnapshot = await getDocs(collection(db, "transactions"));
        const transactionList = transactionSnapshot.docs.map(doc => doc.data());
        setTransactions(transactionList);
      } catch (error) {
        console.error("Error fetching transactions: ", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddProduct = async () => {
    if (!productName || !productCategory || !productPrice || !productImage) {
      alert("All fields are required!");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: productName,
        category: productCategory,
        price: productPrice,
        image: productImage, 
        timestamp: new Date(),
      });

      setProductName("");
      setProductCategory("");
      setProductPrice("");
      setProductImage("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Portal</h2>
      
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Image Link"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
        />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>

      {/* Transaction Table */}
      <h3>Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.paymentMethod}</td>
                <td>${transaction.totalAmount}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
