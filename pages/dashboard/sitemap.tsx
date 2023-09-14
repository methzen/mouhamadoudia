import { useState } from "react"
import Head from "next/head"

import Header from "../../components/dashboard/header"
import Sidebar from "../../components/dashboard/sidebar"
import { NextPageContext } from "next"
import authUser from "../../api/admin-user/auth"
import updateSitemap from "../../api/sitemap/updateSitemap"
import restartPm2Process from "../../api/sitemap/restartPm2Process"
import pingSearchEngines from "../../api/sitemap/pingSearchEngines"

Sitemap.getInitialProps = async ({req, res}: NextPageContext) =>{
  const authResult = await authUser(req)

  if (!authResult.success) {
    res?.writeHead(302, { Location: "/login" })
    res?.end()
  }

  return {}
}
export default function Sitemap(props:any) {
      //update sitemap
      const [updateSitemapLoading, setUpdateSitemapLoading]=useState(false)
      const [updateSitemapError, setUpdateSitemapError]=useState(false)
      const [updateSitemapSuccess, setUpdateSitemapSuccess]=useState(false)
      //restart pm2
      const [restartPm2Loading,setRestartPm2Loading]=useState(false)
      const [restartPm2Error,setRestartPm2Error]=useState(false)
      const [restartPm2Success,setRestartPm2Success]=useState(false)
      //send ping to search engines
      const [pingLoading,setPingLoading]=useState(false)
      const [pingError,setPingError]=useState(false)
      const [pingSuccess,setPingSuccess]=useState(false)

  const updateSitemapRequest = () => {
    setUpdateSitemapLoading(true)
    setUpdateSitemapError(true)
    setUpdateSitemapSuccess(true)

    updateSitemap(function(apiResponse:any) {
      if (apiResponse.submitError) {
        setUpdateSitemapLoading(false)
        setUpdateSitemapError(true)
        setUpdateSitemapSuccess(false)
      } else if (!apiResponse.authSuccess) {
        window.location.href = "/login"
      } else if (!apiResponse.success) {
        setUpdateSitemapLoading(false)
        setUpdateSitemapError(true)
        setUpdateSitemapSuccess(false)
      } else {
        setUpdateSitemapLoading(false)
        setUpdateSitemapError(false)
        setUpdateSitemapSuccess(true)
      }
    })
  }

  const restartPm2Request = () => {
    setRestartPm2Loading(true)
    setRestartPm2Error(false)
    setRestartPm2Success(false)
  
    restartPm2Process(function(apiResponse:any) {
      if (apiResponse.submitError) {
        setRestartPm2Loading(false)
        setRestartPm2Error(true)
        setRestartPm2Success(false)
      } else if (!apiResponse.authSuccess) {
        window.location.href = "/login"
      } else if (!apiResponse.success) {
        setRestartPm2Loading(false)
        setRestartPm2Error(true)
        setRestartPm2Success(false)
      } else {
        setRestartPm2Loading(false)
        setRestartPm2Error(false)
        setRestartPm2Success(true)
      }
    })
  }

  const pingSearchEnginesRequest = () => {  
    setPingLoading(true)
    setPingError(false)
    setPingSuccess(false)
  
    pingSearchEngines(function(apiResponse:any) {
      if (apiResponse.submitError) {
        setPingLoading(false)
        setPingError(true)
        setPingSuccess(false)
      } else if (!apiResponse.authSuccess) {
        window.location.href = "/login"
      } else if (!apiResponse.success) {
        setPingLoading(false)
        setPingError(true)
        setPingSuccess(false)
      } else {
        setPingLoading(false)
        setPingError(false)
        setPingSuccess(true)
      }
    })
  }

    return (
      <div className="db-layout-wrapper">
        <Head>
          <title>Sitemap | Admin</title>
        </Head>
        <Header />
        <Sidebar page="sitemap" />
        <div className="db-layout-content-container">
          <div className="sitemap-content">
            <div className="sitemap-header">
              <span>Manage Sitemap</span>
            </div>
            <div className="sitemap-form-container">
              <div className="sitemap-form-section">
                <div className="sitemap-form-title">
                  <span>Update Sitemap XML File</span>
                </div>
                <div className="sitemap-form-description">
                  <span>This will write new content to the sitemap.xml file hosted by the fronted website.</span>
                </div>
                <div className="sitemap-form-btn-container">
                  {
                    !updateSitemapLoading ?
                    <div onClick={updateSitemapRequest} className="sitemap-form-btn">
                      <span>Update Sitemap</span>
                    </div> :
                    <div className="sitemap-form-btn loading">
                      <span>Loading</span>
                    </div>
                  }
                </div>
                {
                  updateSitemapSuccess ?
                  <div className="sitemap-success-msg">
                    <span>Success!</span>
                  </div> : null
                }
                {
                  updateSitemapError ?
                  <div className="sitemap-error-msg">
                    <span>An error occurred.</span>
                  </div> : null
                }
              </div>
              <div className="sitemap-form-section">
                <div className="sitemap-form-title">
                  <span>Restart Frontend Website PM2 Process</span>
                </div>
                <div className="sitemap-form-description">
                  <span>This will make any sitemap updates live in production by restarting the PM2 process.</span>
                </div>
                <div className="sitemap-form-btn-container">
                  {
                    !restartPm2Loading ?
                    <div onClick={restartPm2Request} className="sitemap-form-btn">
                      <span>Restart PM2</span>
                    </div> :
                    <div className="sitemap-form-btn loading">
                      <span>Loading</span>
                    </div>
                  }
                </div>
                {
                  restartPm2Success ?
                  <div className="sitemap-success-msg">
                    <span>Success!</span>
                  </div> : null
                }
                {
                  restartPm2Error ?
                  <div className="sitemap-error-msg">
                    <span>An error occurred.</span>
                  </div> : null
                }
              </div>
              <div className="sitemap-form-section">
                <div className="sitemap-form-title">
                  <span>Ping Search Engines</span>
                </div>
                <div className="sitemap-form-description">
                  <span>This will ping Google and Bing to let them know updates to the sitemap have been made.</span>
                </div>
                <div className="sitemap-form-btn-container">
                  {
                    !pingLoading ?
                    <div onClick={pingSearchEnginesRequest} className="sitemap-form-btn">
                      <span>Send Ping</span>
                    </div> :
                    <div className="sitemap-form-btn loading">
                      <span>Loading</span>
                    </div>
                  }
                </div>
                {
                  pingSuccess ?
                  <div className="sitemap-success-msg">
                    <span>Success!</span>
                  </div> : null
                }
                {
                  pingError ?
                  <div className="sitemap-error-msg">
                    <span>An error occurred.</span>
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}