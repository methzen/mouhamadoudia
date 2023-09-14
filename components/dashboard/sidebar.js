import { Component } from "react"
import Link from 'next/link'

export default function Sidebar({page}) {
    return (
      <div className="db-sidebar-wrapper">
        <div className="db-sidebar-list">
          <ul>
            <Link className={page === "blog-posts" ? "active" : null} href="/dashboard">
              <li>
                <span>Blog Posts</span>
              </li>
            </Link>
            <Link className={page === "images" ? "active" : null} href="/dashboard/images">
              <li>
                <span>Images</span>
              </li>
            </Link>
            <Link className={page === "sitemap" ? "active" : null} href="/dashboard/sitemap">
              <li>
                <span>Sitemap</span>
              </li>
            </Link>
            <Link className={page === "password" ? "active" : null} href="/dashboard/change-password">
              <li>
                <span>Change Password</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    )
}