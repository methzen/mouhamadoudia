import React, { Component } from "react"

import logout from "../../api/admin-user/logout"

export default class extends Component {
  requestLogout = () => {
    logout(function() {
      window.location.href = "/login"
    })
  }

  render () {
    return (
      <div className="db-header-wrapper">
        <div className="db-header-logo">
          <a href="/dashboard">
            <span>Admin Dashboard</span>
          </a>
        </div>
        <div onClick={() => this.requestLogout()} className="db-header-log-out">
          <span>Logout</span>
        </div>
      </div>
    )
  }
}