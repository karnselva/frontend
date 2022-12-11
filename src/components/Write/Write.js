import {  useState } from "react";
import "./write.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category,setCategory]=useState("POLITICS");
  const user = localStorage.getItem("userId")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      user,
      title,
      description:desc,
      category,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://karan-backend.onrender.com/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("https://karan-backend.onrender.com/api/blog/add", newPost);
      const data = await res.data;
      navigate("/post/" + data.blog._id)

    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
      <div className="cb">
   
   <label className="select">
     <h3 className="write-heading">Category</h3>
     <select value={category} onChange={event => setCategory(event.target.value)} className="select-option">
       <option value="SPORTS" className="option">SPORTS</option>
       <option value="ECONOMICS" className="option">ECONOMICS</option>
       <option value="POLITICS" className="option">POLITICS</option>
       <option value="ENTERTAINMENT" className="option">ENTERTAINMENT</option>
     </select>
   </label>

   
    
      
     </div>  
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
               
 
        </div>

        <div className="writeFormGroup">
       
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>


        </div>
        <button className="writeSubmit" type="submit">
       Publish
     </button> 

   
      </form>
    </div>
  );
}