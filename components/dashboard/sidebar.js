import { Component } from "react"

export default class extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="db-sidebar-wrapper">
        <div className="db-sidebar-list">
          <ul>
            <a className={this.props.page === "blog-posts" ? "active" : null} href="/dashboard">
              <li>
                <span>Blog Posts</span>
              </li>
            </a>
            <a className={this.props.page === "images" ? "active" : null} href="/dashboard/images">
              <li>
                <span>Images</span>
              </li>
            </a>
            <a className={this.props.page === "sitemap" ? "active" : null} href="/dashboard/sitemap">
              <li>
                <span>Sitemap</span>
              </li>
            </a>
            <a className={this.props.page === "password" ? "active" : null} href="/dashboard/change-password">
              <li>
                <span>Change Password</span>
              </li>
            </a>
          </ul>
        </div>
      </div>
    )
  }
}