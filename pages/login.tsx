import { ChangeEvent, Component, useEffect, useState } from "react"
import Head from "next/head"

import login from "../api/admin-user/login.js"
import authUser from "../api/admin-user/auth.js"
import removeAdminUserCookie from "../api/admin-user/removeAdminUserCookie"
import Header from "../components/header"
import Footer from "../components/footer"
import { NextPageContext } from "next"
import { Container } from "@mui/material"

Login.getInitialProps = async ({req, res} : NextPageContext) => {
    const authResult = await authUser(req)

    if (authResult.success) {
      res?.writeHead(302, { Location: "/dashboard/" })
      res?.end()
    }
    return {}
}

interface LoginState {
    loading: boolean,
    credentialError: boolean,
    emailInputValue: string,
    emailRequiredError: boolean,
    passwordInputValue: string,
    passwordRequiredError: boolean  
}
export default function Login() {

const [loginState, setLoginState] = useState<LoginState>({
    loading: false,
    credentialError: false,
    emailInputValue: "",
    emailRequiredError: false,
    passwordInputValue: "",
    passwordRequiredError: false
  })

  useEffect(()=>{
    removeAdminUserCookie()
  },[])

  const updateEmailInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const newloginState={
        ...loginState,
        emailInputValue: event.target.value,
        emailRequiredError: false
    }
    setLoginState(newloginState)
  }

  const updatePasswordInputValue = (event:ChangeEvent<HTMLInputElement>) => {
    setLoginState({...loginState,
      passwordInputValue: event.target.value,
      passwordRequiredError: false
    })
  }

 const submitLoginRequest = () => {
    if (!loginState.emailInputValue || !loginState.passwordInputValue) {
      if (!loginState.emailInputValue) setLoginState({...loginState, emailRequiredError: true })
      if (!loginState.passwordInputValue) setLoginState({...loginState, passwordRequiredError: true })
    } else {
        setLoginState({...loginState,loading: true })

      login(loginState.emailInputValue, loginState.passwordInputValue, function(apiResponse:any) {
        if (!apiResponse.success) {
            setLoginState({...loginState,
            loading: false,
            credentialError: true,
            emailRequiredError: false,
            passwordRequiredError: false
          })
        } else {
          window.location.href = "/dashboard/"
        }
      })
    }
  }


    return (
      <Container maxWidth="md">
      <div className="layout-wrapper">
        <Head>
          <title>Login | Admin</title>
        </Head>
        <Header />
          <div className="contact-container">
            <div className="inputs-container">
              
                {
                  loginState.credentialError ?
                  <div className="login-form-error-block">
                    <span>Email address and/or password is incorrect.</span>
                  </div> : null
                }
                <div className="login-form-top-header">
                  <span>Admin Login</span>
                </div>
                <div className="login-form-field">
                  <input
                    onChange={updateEmailInputValue}
                    value={loginState.emailInputValue}
                    type="email"
                    autoComplete="new-password"
                    placeholder="Email Address"
                    className={loginState.credentialError || loginState.emailRequiredError ? "error" : undefined}
                  />
                  {
                    loginState.emailRequiredError ?
                    <div className="login-form-error-msg">
                      <span>Email field is required.</span>
                    </div> : null
                  }
                </div>
                <div className="login-form-field">
                  <input
                    onChange={updatePasswordInputValue}
                    value={loginState.passwordInputValue}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    className={loginState.credentialError || loginState.passwordRequiredError ? "error" : undefined}
                  />
                  {
                    loginState.passwordRequiredError ?
                    <div className="login-form-error-msg">
                      <span>Password field is required.</span>
                    </div> : null
                  }
                </div>
            </div>
              <div className="login-form-submit-btn-container">
                {
                  !loginState.loading ?
                  <div onClick={() => submitLoginRequest()} className="login-form-submit-btn">
                    <span>Login</span>
                  </div> :
                  <div className="login-form-submit-btn loading">
                    <span>Loading</span>
                  </div>
                }
              </div>
          </div>
          <Footer />
      </div>
      </Container>

    )
}