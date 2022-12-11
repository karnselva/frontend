import B5 from "../../images/B5.jpg"
import './home.css'

function Home() {
const sectionStyle = {
  width: "100vw",
  height: "85vh",
  backgroundImage: `url(${B5})`,
  backgroundSize:"cover"
 
}

  return (
    <div  style={ sectionStyle } className="home-container">
       <h1 className="home-heading" >Get started ...</h1>
    </div>
  )
}

export default Home
