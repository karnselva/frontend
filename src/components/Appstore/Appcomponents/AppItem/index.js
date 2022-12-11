import './index.css'
import {Link} from 'react-router-dom'
const AppItem = props => {
  const {appDetails,id} = props
  const {title, description,photo} = appDetails
  
  const PF = "https://karan-backend.onrender.com/images/";

  return (
    <li className="blog-item">
    <Link to={`/post/${id}`} className="blog-item-link">
      <div className="blog-item-container">
        <img className="blog-item-image" src={PF + photo} alt="" />
        <div className="blog-item-info">
          <p className="blog-item-topic">{title}</p>
          <p className="blog-item-title">{description}</p>
        </div>
      </div>
    </Link>
  </li>
    
    )
}

export default AppItem


