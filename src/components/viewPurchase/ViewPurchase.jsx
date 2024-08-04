

import { useEffect, useState } from "react";
// import "../../pages/purchase/Purchase.scss";
import "./ViewPurchase.scss"
import axios from "axios";
export default function ViewPurchase(props) {
    const [purchases, setPurchases] = useState([]);
    // const [popup, setPopup] = useState(false);
    const fetch = async () => {
        const a = await axios.get(
          `http://66.45.251.54/~porshtal/porshtal-backend/public/api/purchases`
        );
        setPurchases(a.data.response.data);
      };
      // const pobup = () => {
      //   setPopup(!popup);

      // };
      useEffect(() => {
        fetch();
      }, []);
      // console.log(pobup);
    return(
        <>
         {/* =====================TABLE DATA============================= */}
         <div className="container table-data">
          <button className="btn btn-primary my-style-btn" onClick={props.popup}>
            ADD PURCHASE
          </button>
          <table className="table table-striped table-dark ">
            <thead>
              <tr>
                <th scope="col">PURCHASE NO</th>
                <th scope="col">SUPPLIER NAME</th>
                <th scope="col">ORDER DATE</th>
                <th scope="col">EXPECTED DATE</th>
                <th scope="col">TOTAL AMOUNT</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.purchase_order_number}</th>
                  <td>{item.supplier.name}</td>
                  <td>{item.order_date}</td>
                  <td>{item.expected_delivery_date}</td>
                  <td>{item.total_amount}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
    )
}