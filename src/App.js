import "./App.css";

import { Route, Routes } from "react-router-dom";
import Purchase from "./pages/purchase/Purchase"
import PurchaseDetails from "./components/purchaseDetails/PurchaseDetails";
// import Edit from "./pages/edit/Edit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Purchase/>} />
        <Route path="/purchase/:id" element={<PurchaseDetails/>} />
        {/* <Route path="/edit" element={<Edit/>} /> */}
        
      </Routes>
    </div>
  );
}

export default App;
