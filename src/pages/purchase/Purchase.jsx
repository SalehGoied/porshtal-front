import { useState } from "react";
import "./Purchase.scss";

import ViewPurchase from "../../components/viewPurchase/ViewPurchase";
import AddPurchase from "../../components/addPurchase/AddPurchase";

export default function Add(props) {
  const [popup, setPopup] = useState(false);
  const pobup = () => {
    setPopup(!popup);
    
  };
  return (
    <>
      <div id="main-page-add">
        <ViewPurchase popup={pobup}/>
        {popup && <AddPurchase popup={pobup}/>}
      </div>
    </>
  );
}
