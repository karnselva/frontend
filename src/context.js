import React from 'react';
 
const AuthContext = React.createContext({status:null,login:()=>{}
,wishList: [],
addWishList: () => {},
deleteWishList: () => {},});
 
export default AuthContext;