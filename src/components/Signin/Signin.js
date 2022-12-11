import { useState,useEffect ,useContext} from 'react'
import { useLocation } from "react-router";
import {useNavigate} from 'react-router-dom'
import  AuthContext  from "../../context";

import {
  LoginContainer,
  ShadowContainer,
  LoginDivContainer,
  ImageEl,
  LoginFormContainer,
  InputEl,
  LabelEl,
  ButtonEl,
  ErrorMsg,
} from './styledComponents'

function SignIn (props) {
  const [details,setDetails]=useState({
    visibility: false,
    name:"",
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    status:false,
  })
  const auth = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const navigate = useNavigate();
  useEffect(() => {
    if (path === "signup"){
      setDetails({...details,status: true})
    }
    else{
      setDetails({...details,status: false})
    }
  }, [path]);
  
  const showPassword = event => {
    if (event.target.checked) {
      setDetails({...details,visibility: true})
    } else {
      setDetails({...details,visibility: false})
    }
  }
  const onChangeUsername= e => {
    setDetails({...details,name: e.target.value})

  }

  const onChangeUseremail = e => {
    setDetails({...details,email: e.target.value})

  }

  const onChangePassword = e => {
    setDetails({...details,password: e.target.value})

  }

  

  const formSubmit = async event => {
    event.preventDefault()
    const {name,email, password} = details
    if ((password.length) > 5) {
      setDetails({...details,errorMsg: ""})
      
    }
    else{
      setDetails({...details,errorMsg: "password should have minimum 6 character",showSubmitError:true})
      
    }
      
    
  const userDetails = {name, password,email}
  const url = `https://karan-backend.onrender.com/api/user/${path}`
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
  },
    body: JSON.stringify(userDetails),

  }
  const response = await fetch(url, options)
  const data = await response.json()
  if (response.ok === true) {
        localStorage.setItem("userId",data.user._id)
        setDetails({...details,errorMsg: data.message,showSubmitError:true})
        auth.login(true)
        navigate('/content')
  } else {
    password.length>5 &&
    setDetails({...details,errorMsg: data.message,showSubmitError:true})
     }
}
  const {
      visibility,
      email,
      status,
      name,
      password,
      showSubmitError,
      errorMsg,
    } = details
  
    return (
      <LoginContainer>
        <ShadowContainer>
          <ImageEl
            src="https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-300x170.png"
            alt="website logo"
          />
          <LoginFormContainer onSubmit={formSubmit}>
          {status && (<LoginDivContainer>
              <LabelEl>NAME</LabelEl>
              <InputEl
                type="text"
                placeholder="Name"
                value={name}
                onChange={onChangeUsername}
              />
            </LoginDivContainer>)}
            <LoginDivContainer>
              <LabelEl>EMAIL</LabelEl>
              <InputEl
                type="text"
                placeholder="Email"
                value={email}
                onChange={onChangeUseremail}
              />
            </LoginDivContainer>
            <LoginDivContainer>
              <LabelEl>PASSWORD</LabelEl>
              <InputEl
                type={visibility ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
            </LoginDivContainer>
            <LoginDivContainer direction="row">
              <InputEl
                type="checkbox"
                id="checkbox"
                onChange={showPassword}
              />
              <LabelEl htmlFor="checkbox" cursor="pointer">
                Show Password
              </LabelEl>
            </LoginDivContainer>
            <ButtonEl>{ status ?  "SignUp": "Login"}</ButtonEl>
            {showSubmitError && (
              <ErrorMsg className="error-message">*{errorMsg}</ErrorMsg>
            )}
          </LoginFormContainer>
        </ShadowContainer>
      </LoginContainer>
    )
  }


export default SignIn