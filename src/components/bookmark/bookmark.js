import { useContext } from "react"
import Display from './displaybookmark'
import AuthContext from "../../context"
const Bookmark = (props) => {
  const {wishListblog}=props
  const auth =useContext(AuthContext)
  console.log(auth.wishList)
  
 return (
    <div>
      {wishListblog.map(eachBlog => (
              <Display  blogDetails={eachBlog} key={eachBlog._id} />
            ))}
      
    </div>
  )
}
export default Bookmark