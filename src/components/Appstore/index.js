import {useEffect,useState} from 'react'
import axios from 'axios'
import AppItem from './Appcomponents/AppItem'
import { useLocation } from "react-router";
import TabItem from './Appcomponents/TabItem'
import {Triangle} from 'react-loader-spinner'
import Pagination from './Pagination';
import './index.css'

const SEARCH_ICON_URL =
  'https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png'

const tabsList = [
  {tabId: 'ALL', displayText: 'All'},
  {tabId: 'POLITICS', displayText: 'Politics'},
  {tabId: 'ECONOMICS', displayText: 'Economics'},
  {tabId: 'SPORTS', displayText: 'Sports'},
  {tabId: 'ENTERTAINMENT', displayText: 'Entertainment'},
]
const Blogs = () => {
  const [details, setDetails] = useState({
    searchInput: '',
    isloading: true,
    activeTabId: tabsList[0].tabId,
    blogs:[],

  })
  
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const path = location.pathname.split("/")[1];
  const sendRequestAll = async () => {
    const res = await axios
      .get("https://karan-backend.onrender.com/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequestMy = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios
      .get(`https://karan-backend.onrender.com/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    path==="myblog" ? (sendRequestMy().then((data) => {
      setDetails({...details,activeTabId:tabsList[0].tabId,isloading:false,blogs:data.user.blogs})
     
      

    })) :
    sendRequestAll().then((data) => {
      setDetails({...details,activeTabId:tabsList[0].tabId,isloading:false,blogs:data.blogs})
    })
  }, [path]);
  
  const setActiveTabId = tabId => {
    setDetails({...details,activeTabId:tabId})
    setCurrentPage(1)
    
  }
  const setActiveInput = e => {
    setDetails({...details,searchInput:e.target.value})
    
  }
   
   const getActiveTabApps = searchedApps => {
    const {activeTabId} = details
    const filteredApps = searchedApps &&
    (searchedApps.filter(
      eachSearchedApp => eachSearchedApp.category === activeTabId,
    ))
    
    if (activeTabId==="ALL") {
      return searchedApps
    }
    return filteredApps

  }
  const getSearchResults = () => {
    const {searchInput,blogs} = details
    const searchResults = blogs && (blogs.filter(eachApp =>
      eachApp.title.toLowerCase().includes(searchInput.toLowerCase()),
    ))

    return searchResults
  }

  const {searchInput, activeTabId,isloading} = details
  const searchResults = getSearchResults()
  const filteredApps = getActiveTabApps(searchResults)
  const lastPostIndex = currentPage * 3;
  const firstPostIndex = lastPostIndex - 3;
  const currentPosts = filteredApps ?  filteredApps.slice(firstPostIndex,lastPostIndex) : null
    
 
    
    
    return (
      <div className="app-container">
        <div className="app-store">
          <h1 className="heading">{ path==="myblog" ? "MyBlog" : "Blogs"}</h1>
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={setActiveInput}
            />
            <img
              src={SEARCH_ICON_URL}
              alt="search icon"
              className="search-icon"
            />
          </div>
          <ul className="tabs-list">
            {tabsList.map(eachTab => (
              <TabItem
                key={eachTab.tabId}
                tabDetails={eachTab}
                setActiveTabId={setActiveTabId}
                isActive={activeTabId === eachTab.tabId}
              />
            ))}
            </ul>
   
          { isloading ? 
          (
            <div className='flex justify-center items-center'>
              <Triangle type='Puff' color='#00BFFF' height={550} width={80} />
           </div>
        ) : 
        (  <ul className="apps-list">
          { path==="myblog" ? (  currentPosts &&
        currentPosts.map((blog) => (
          <AppItem key={blog._id} appDetails={blog}  id={blog._id} />

        ))) :
          (currentPosts && currentPosts.map(eachApp => (
              <AppItem key={eachApp._id} appDetails={eachApp}  id={eachApp._id}/>
            ))) }
          </ul>) }
          {filteredApps && <Pagination
                totalPosts={filteredApps.length}
                
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />}
        </div>
      </div>
    )
  }


export default Blogs