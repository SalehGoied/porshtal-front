import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants"; // Adjust the path based on your file structure
import "./AddPurchase.scss";

export default function AddPurchase(props) {
  const [name, setName] = useState("");
  const [Expected, setExpected] = useState("");
  const [Order, setOrder] = useState("");
  const [supplier, setSupplier] = useState([]);
  const navigate = useNavigate();

  const postData = async () => {
    try {
      const postData = await axios.post(
        `${BASE_URL}/purchases`,
        {
          order_date: Order.toString().split('-').reverse().join('-'),
          expected_delivery_date: Expected.toString().split('-').reverse().join('-'),
          supplier_id: supplier.filter((s) => s.name === name)[0].id,
        }
      );
      console.log("Success");
      const purchaseId = postData.data.response.data.id;
      navigate(`/purchase/${purchaseId}`);
    } catch (error) {
      console.log("Error while fetching");
      console.log(error);
    }
  };

  function submit(e) {
    e.preventDefault();
    postData();
  }

  const fetchSupplier = async () => {
    const data = await axios.get(`${BASE_URL}/suppliers`);
    setSupplier(data.data.response.data);
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <>
      <div className="model-popup-add">
        <form onSubmit={submit} className="form-data container">
          <label htmlFor="" className="label-input">
            Order date
          </label>
          <input
            type="date"
            className="input-form"
            value={Order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          />
          <label htmlFor="" className="label-input">
            Expected delivery date
          </label>
          <input
            type="date"
            className="input-form"
            value={Expected}
            onChange={(e) => {
              setExpected(e.target.value);
            }}
          />
          <label htmlFor="" className="label-input">
            Supplier Name
          </label>
          <select
            className="form-select input-form"
            aria-label="Default select example"
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            {supplier.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
          <div className="container-btns">
            <button
              type="submit"
              className="btn btn-danger my-style-btn-form"
              onClick={props.popup}
            >
              Cancel
            </button>
            <button className="btn btn-primary my-style-btn-form">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
