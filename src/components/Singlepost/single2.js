import axios from "axios";
import { useEffect, useState,useContext } from "react";
import {  useParams } from "react-router-dom";
import Comments from "./Comments/Comments";
import "./singlePost.css";
import {useNavigate} from 'react-router-dom'
import { BsBookmarkPlusFill } from "react-icons/bs";
import { BsBookmarkPlus } from "react-icons/bs";
import  AuthContext  from "../../context" ;


export default function SinglePost() {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  const [bookmark,setBookmark]=useState();
  const PF = "https://karan-backend.onrender.com/images/";
  const user = localStorage.getItem("userId")
  const [updateMode, setUpdateMode] = useState();
  
  const fetchDetails = async () => {
    const res = await axios
      .get(`https://karan-backend.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        category:data.blog.category,
        id:data.blog.user._id,
        blogId:data.blog._id,
        name:data.blog.user.name,
        photo:data.blog.photo,
        createdAt:data.blog.createdAt
      });
    });
  }, [id]);
  useEffect( () =>{
    const ismarked =auth.wishList.filter(blogId => inputs.blogId === blogId )
    const bookstatus = (ismarked.length === 1 ? true : false)
    setBookmark(bookstatus)
    
  },[inputs])



  const handleDelete = async () => {
    try {
      await axios.delete(`https://karan-backend.onrender.com/api/blog/${inputs.blogId}`
      );
      auth.deleteWishList(inputs.blogId)
      navigate("/content" )
    } catch (err) {}
  };
  const handleUpdate = async () => {  
    try {
      await axios.put(`https://karan-backend.onrender.com/api/blog/update/${inputs.blogId}`, {
        title:inputs.title,
        description:inputs.description,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {inputs.photo && (
          <img src={PF + inputs.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={inputs.title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setInputs({...inputs,
              title: e.target.value})}
          />
        ) : (
          <>
          <h1 className="singlePostTitle">
            {inputs.title}
            

            </h1>
            {inputs.id === user && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
           
            { bookmark ?  <BsBookmarkPlusFill  className="bookmark" onClick={()  => {
              setBookmark(false)
              auth.deleteWishList(inputs.blogId)
                } }/> 
            : <BsBookmarkPlus className="bookmark" onClick={()  => {
              setBookmark(true)
              auth.addWishList(inputs.blogId)
              } }/> }

            </>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: {inputs.name}
            
          </span>
          <span className="singlePostAuthor">
             Category: {inputs.category}
          </span>
          <span className="singlePostDate">
            {new Date(inputs.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={inputs.description}
            onChange={(e) => setInputs({...inputs,
              description:e.target.value})}
          />
        ) : (
          <>
          <p className="singlePostDesc">{inputs.description}</p>
          <Comments/> </>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}