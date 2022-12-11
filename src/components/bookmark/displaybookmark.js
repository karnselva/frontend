import React from 'react'
import { Link } from 'react-router-dom'
import './displaybookmark.css'
 const Display = (props) =>{
    const {blogDetails}=props
    const {title, description,photo,_id} = blogDetails
    const id =_id
    console.log(id)
    const PF = "https://karan-backend.onrender.com/images/";
  
    return (
      <div className='bg-container'>
      <li className="blog-item">
        <Link to={`/post/${id}`} className="blog-item-link">
        <div className="bookmark-item-container">
          <img className="blog-item-image" src={PF + photo} alt="" />
          <div className="blog-item-info">
            <p className="blog-item-topic">{title}</p>
            <p className="blog-item-title">{description}</p>
          </div>
        </div>
        </Link>
    </li>
      </div>
      )}
export default Display