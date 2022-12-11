import {  Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AuthContext from './context'
import NavBar from "./components/Navbar/Navbar"
import SignIn from './components/Signin/Signin'
import Home from './components/home/Home'
import Blogs from './components/Appstore/index'
import Write from './components/Write/Write'
import SinglePost from './components/Singlepost/single2'
import Bookmark from './components/bookmark/bookmark'

const App = () => {
  const islogin = localStorage.getItem("userId")
  const [authstatus, setauthstatus] = useState(islogin);
  const [wishList,setwishList]=useState([])
  const[wishListblog,setwishListBLog]=useState([])
  
  
   const login = (s) => {
     setauthstatus(s);

   };
   const addWishList =  (blogid) =>{
    setwishList([...wishList,blogid])
    
    
   }
   const deleteWishList = (blogid) =>{
    const postDelete = wishList.filter(id => id !== blogid )
    
    setwishList(postDelete)
   }
   const getbookmarks = async () => {
    const res = await axios
      .get(`https://karan-backend.onrender.com/api/user/bookmarks/${islogin}`)
      .catch((err) => console.log(err));
    const data = await res.data.bookmarks
    const blog=await res.data.blog.bookmarks;
    setwishListBLog([...blog])
    return data;
  };

  const handleUpdate = async () => {  
    try {
     const res = await axios.post("https://karan-backend.onrender.com/api/user/updatebookmarks/", {
        bookmark:wishList,
        userId:islogin,
      });
      const data = await res.data
      
      
    } catch (err) {}
  }
  useEffect(()=>{
    wishList.length>0 && handleUpdate().then(() => getbookmarks())
  },[wishList])
  
  useEffect(() =>{
    getbookmarks().then(data => {
      setwishList([...data])
    }
    
    )
  },[])

 
  

  return(
  <>
    <AuthContext.Provider value={{ status: authstatus, login: login , wishList : wishList, addWishList : addWishList ,
    deleteWishList:deleteWishList}}>
        <NavBar   />
        <Routes>
       
          <Route path="/post/:id" element={ authstatus ? <SinglePost /> : <Home/> } /> 
          <Route path="/content" element ={ authstatus ? <Blogs/> : <Home/>} />
          <Route path="/write" element={ authstatus ? <Write /> : <Home/>} /> 
          <Route path="/myblog" element={ authstatus ? <Blogs/> : <Home/>} /> 
          <Route path="/bookmark" element={ authstatus ? <Bookmark wishListblog = {wishListblog} />: <Home/>} /> 
          <Route path="/" element={ authstatus ? <Blogs/> :<Home />} />
          <Route path="/login" element={authstatus ? <Blogs/> : <SignIn />} /> 
          <Route path="/signup" element={authstatus ? <Blogs/> : <SignIn />} /> 
          

        </Routes>
    </AuthContext.Provider>
    </>
)}
export default App



      