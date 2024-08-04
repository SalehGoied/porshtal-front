import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants"; // Adjust the path based on your file structure

export default function PurchaseDetails() {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fetchPurchase = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/purchases/${id}`);
      setPurchase(response.data.response.data);
    } catch (error) {
      console.log("Error while fetching purchase details");
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data.response.data);
    } catch (error) {
      console.log("Error while fetching products");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPurchase();
    fetchProducts();
  }, [id]);

  const handleAddPurchaseItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/purchase-items`, {
        purchase_id: id,
        product_id: productId,
        quantity: quantity,
      });
      alert("Purchase item added successfully");
      fetchPurchase(); // Refresh the purchase details after adding the item
    } catch (error) {
      console.log("Error while adding purchase item");
      console.log(error);
    }
  };

  if (!purchase) return <div>Loading...</div>;

  return (
    <div>
      <h1>Purchase Details</h1>
      <p>Order Date: {purchase.order_date}</p>
      <p>Expected Delivery Date: {purchase.expected_delivery_date}</p>
      <p>Supplier Name: {purchase.supplier.name}</p>
      <p>Status: {purchase.status}</p>
      <p>Total Amount: {purchase.total_amount}</p>

      <h2>Items</h2>
      <ul>
        {purchase.items.map((item) => (
          <li key={item.id}>
            Product ID: {item.product_id}, Quantity: {item.quantity}, Unit Price: {item.unit_price}, Total Price: {item.total_price}
          </li>
        ))}
      </ul>

      <h2>Add Purchase Item</h2>
      <form onSubmit={handleAddPurchaseItem}>
        <label>
          Product:
          <select value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="" disabled>Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
