import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products/Products";
import BuyNow from "./Pages/BuyNow/BuyNow";
import Cart from "./Pages/Cart.jsx/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Products}/>
        <Route path="products" Component={Products}/>
        <Route path="buynow/:id" Component={BuyNow}/>
        <Route path="cart" Component={Cart}/>
      </Routes> 
    </Router>
  );
}

export default App;
