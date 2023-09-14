import React, { Component } from "react"
import Link from 'next/link'
import logout from "../../api/admin-user/logout"

const dashHeader =()=>{
  const requestLogout = () => {
    logout(function() {
      window.location.href = "/login"
    })
  }
    return (
      <div className="db-header-wrapper">
        <div className="db-header-logo">
          <Link href="/dashboard">
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <div onClick={() => requestLogout()} className="db-header-log-out">
          <span>Logout</span>
        </div>
      </div>
    )
}

export default dashHeader;