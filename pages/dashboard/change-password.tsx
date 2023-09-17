import { useState } from "react"
import Head from "next/head"
import { NextPageContext } from "next"
import Header from "../../components/dashboard/header"
import Sidebar from "../../components/dashboard/sidebar"

import authUser from "../../api/admin-user/auth"
import changePassword from "../../api/admin-user/changePassword"

ChangePassword.getInitialProps =  async ({req, res}: NextPageContext)=>{
  const authResult = await authUser(req)

  if (!authResult.success) {
    res?.writeHead(302, { Location: "/login" })
    res?.end()
  }

  return {}
}
type InitialState ={
  loading: boolean
  error: boolean
  errorMsg: string
  success: boolean
  currentPasswordInputValue: string
  newPasswordInputValue: string
  confirmNewPasswordInputValue: string
}
export default function ChangePassword(props:any){

  const [initialState, setInitialState] = useState<InitialState>({
    loading: false,
    error: false,
    errorMsg: "",
    success: false,
    currentPasswordInputValue: "",
    newPasswordInputValue: "",
    confirmNewPasswordInputValue: ""
  })

  const updateCurrentPasswordInputValue = (event:any) => {
    const newState ={
      ...initialState,
      currentPasswordInputValue: event.target.value
    }
    setInitialState(newState)
  }

  const updateNewPasswordInputValue = (event:any) => {
    const newState ={
      ...initialState,
      newPasswordInputValue: event.target.value
    }
    setInitialState(newState)
  }

  const updateConfirmNewPasswordInputValue = (event:any) => {
    const newState ={
      ...initialState,
      confirmNewPasswordInputValue: event.target.value
    }
    setInitialState(newState)
  }

  const submitChangeRequest = () => {
    if (!initialState.currentPasswordInputValue) {
      const newState ={
        ...initialState,
        error: true, errorMsg: "Current password field is required.", success: false
      }
      setInitialState(newState)
    } else if (!initialState.newPasswordInputValue) {
      const newState ={
        ...initialState,
        error: true, errorMsg: "New password field is required.", success: false
      }
      setInitialState(newState)
    } else if (initialState.newPasswordInputValue !== initialState.confirmNewPasswordInputValue) {
      const newState ={
        ...initialState,
        error: true, errorMsg: "New password values do not match.", success: false
      }
      setInitialState(newState)
    } else {
      const newState ={
        ...initialState,
        loading: true, error: false, errorMsg: "", success: false,
      }
      setInitialState(newState)

      changePassword(initialState.currentPasswordInputValue, initialState.newPasswordInputValue, function(apiResponse:any) {
        if (apiResponse.submitError) {
          const newState ={
            ...initialState,
            loading: false, error: true, errorMsg: "An error occured.", success: false
          }
          setInitialState(newState)
        } else if (apiResponse.invalidPasswordCredentialError) {

          const newState ={
            ...initialState,
            loading: false, error: true, errorMsg: "Current password credential is invalid.", success: false
          }
          setInitialState(newState)
        } else if (!apiResponse.authSuccess) {
          window.location.href = "/login"
        } else {

          const newState ={
            ...initialState,
            loading: false, error: false, success: true
          }
          setInitialState(newState)
        }
      })
    }
  }
    return (
      <div className="db-layout-wrapper">
        <Head>
          <title>Change Password | Admin</title>
        </Head>
        <Header />
        <Sidebar page="password" />
        <div className="db-layout-content-container">
          <div className="settings-content">
            <div className="settings-header">
              <span>Admin Password</span>
            </div>
            <div className="settings-form-container">
              <div className="settings-form-title">
                <span>Change Password</span>
              </div>
              <div className="settings-form-section">
                <div className="settings-form-section-label">
                  <span>Current Password:</span>
                </div>
                <div className="settings-form-section-input">
                  <input
                    type="password"
                    value={initialState.currentPasswordInputValue}
                    onChange={updateCurrentPasswordInputValue}
                  />
                </div>
              </div>
              <div className="settings-form-section">
                <div className="settings-form-section-label">
                  <span>New Password:</span>
                </div>
                <div className="settings-form-section-input">
                  <input
                    type="password"
                    value={initialState.newPasswordInputValue}
                    onChange={updateNewPasswordInputValue}
                  />
                </div>
              </div>
              <div className="settings-form-section">
                <div className="settings-form-section-label">
                  <span>Confirm New Password:</span>
                </div>
                <div className="settings-form-section-input">
                  <input
                    type="password"
                    value={initialState.confirmNewPasswordInputValue}
                    onChange={updateConfirmNewPasswordInputValue}
                  />
                </div>
              </div>
              <div className="settings-page-submit-btn-section">
                <div className="settings-form-btn-container">
                  {
                    !initialState.loading ?
                    <div onClick={submitChangeRequest} className="settings-form-btn">
                      <span>Submit</span>
                    </div> :
                    <div className="settings-form-btn loading">
                      <span>Loading</span>
                    </div>
                  }
                </div>
                {
                  initialState.error ?
                  <div className="settings-submit-error-msg">
                    <span>{initialState.errorMsg}</span>
                  </div> : null
                }
                {
                  initialState.success ?
                  <div className="settings-submit-success-msg">
                    <span>Success!</span>
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}