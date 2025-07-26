import {Link} from "react-router-dom";


function Navbar(){
    return(
        <>
            <div className="headingbox">
                <h1>My Store</h1>
                <div className="links">
                    <Link to="/" className="home">Home</Link>
                    <Link to="/Cart" className="home">My Cart</Link>
                </div>
                
            </div>
        </>
    )
}

export default Navbar;