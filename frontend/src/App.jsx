
import Shophome from "./Shophome.jsx";
import Navbar from "./Navbar.jsx";
import Cart from "./Cart.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(){
  return(
  <>
    <Router>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Shophome/>}/>
        <Route path="/Cart" element={<Cart/>}/>
      </Routes>

    </Router>
    
    
  </>
)
}

export default App;