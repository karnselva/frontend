import { useState ,useContext} from "react";
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { BsBookmarkCheck } from "react-icons/bs";


import { Link ,  useNavigate} from 'react-router-dom'

import "./Navbar.css";
import  AuthContext  from "../../context";

function NavBar(props) {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
    const [Mobile, setMobile] = useState(false)
	return (
    <>
      <nav className='navbar' >
	     <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/L%C3%ADnea_B_%28Logo_Metro_de_Medell%C3%ADn%29.svg" className="nav-img" alt=""/>
        
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
	     {auth.status ?
				<>
				<li  className="nav-item">
					<Link  to="/content">
				Blog
				</Link></li>
				<li className="nav-item">
				<Link  to="/write">
				Write
				</Link></li>
				<li className="nav-item">
				<Link  to="/myblog">
				MyBlog
				</Link></li>
				<li className="nav-item">  {auth.wishList.length > 0 ? (
              <span className="cart-count-badge">{auth.wishList.length}</span>
            ) : null} <Link  to="/bookmark"> <BsBookmarkCheck/> </Link></li>
				<button className="button-navbar button-logout " onClick={() => {localStorage.removeItem("userId");
				auth.login(false);
				navigate('/login');
				}}>
				Logout
				</button>
				</>  :
				<>
				<li className="nav-item">
				<Link  to="/">
				Home
				</Link></li>
				<Link  to="/login">
				<button className="button-navbar ">
				SignIn</button>
				</Link>
				<Link  to="/signup">
				<button className="button-navbar ">
				SignUp</button>
				</Link>
				
				</>  }
			</ul>
         <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>        
    );
}

export default NavBar;