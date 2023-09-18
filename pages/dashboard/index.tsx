import { useState } from "react"
import Head from "next/head"
import moment from "moment"
import Link from 'next/link'
import Header from "../../components/dashboard/header"
import Sidebar from "../../components/dashboard/sidebar"
import { NextPageContext } from "next"
import getAllPosts from "../../api/blog-posts/getAllPosts"

Dashboard.getInitialProps=async ({req, res}: NextPageContext)=> {
  const apiResult = await getAllPosts(req)

  if (!apiResult.authSuccess) {
    res?.writeHead(302, { Location: "/login" })
    res?.end()
  }

  return {
    activePosts: apiResult.activePosts ? apiResult.activePosts : [],
    upcomingPosts: apiResult.upcomingPosts ? apiResult.upcomingPosts : [],
    getDataError: apiResult && apiResult.getDataError
  }
}
export default function Dashboard({activePosts, upcomingPosts, getDataError}:any){

  const [showActivePosts, SetShowActivePosts] = useState(true)
  const [showUpcomingPosts, SetShowUpcomingPosts] = useState(false)

  const handleActiveBtnClick = () => {
      SetShowActivePosts(true)
      SetShowUpcomingPosts(false)
  }

  const handleUpcomingBtnClick = () => {
    SetShowActivePosts(false)
    SetShowUpcomingPosts(true)
  }
    return (
      <div className="db-layout-wrapper">
        <Head>
          <title>Blog Posts | Admin</title>
        </Head>
        <Header />
        <Sidebar page="blog-posts" />
        <div className="db-layout-content-container">
          <div className="blog-posts-content">
            <div className="blog-posts-top-header">
              <div className="blog-posts-page-label">
                <span>All Blog Posts</span>
              </div>
              <div className="blog-posts-add-new-btn-container">
                <Link href="/dashboard/blog/create-new-post">
                  <div className="blog-posts-add-new-btn">
                    <span>+ Add New Post</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="blog-posts-list-container">
              {
                !getDataError ?
                <>
                  <div className="blog-posts-list-tab-btns">
                    <div className="blog-posts-list-tab-btn-container">
                      <div
                        className={showActivePosts ? "blog-posts-list-tab-btn active" : "blog-posts-list-tab-btn"}
                        onClick={() => handleActiveBtnClick()}
                      >
                        <span>Active</span>
                      </div>
                    </div>
                    <div className="blog-posts-list-tab-btn-container">
                      <div
                        className={showUpcomingPosts ? "blog-posts-list-tab-btn active" : "blog-posts-list-tab-btn"}
                        onClick={() => handleUpcomingBtnClick()}
                      >
                        <span>Upcoming</span>
                      </div>
                    </div>
                  </div>
                  <div className="blog-posts-list-items-table">
                    <div className="blog-posts-list-items-table-header">
                      <div className="blog-posts-list-items-table-header-item title">
                        <span>Title</span>
                      </div>
                      <div className="blog-posts-list-items-table-header-item date">
                        <span>Date</span>
                      </div>
                      <div className="blog-posts-list-items-table-header-item edit">
                        <span></span>
                      </div>
                    </div>
                    {
                      showActivePosts && activePosts.length ?
                      activePosts.map((post:any, index:number) => {
                        return (
                          <div key={index} className="blog-posts-list-items-table-item">
                            <div className="blog-posts-list-items-table-item-data title">
                              <span>{post.title}</span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data date">
                              <span>{moment.unix(post.dateTimestamp).format('MM/DD/YYYY')}</span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data edit">
                              <Link href={`/dashboard/blog/edit-post/${post.id}`}>
                                <span>Edit</span>
                              </Link>
                              <span> {">"} </span>
                            </div>
                          </div>
                        )
                      }) : null
                    }
                    {
                      showUpcomingPosts && upcomingPosts.length ?
                      upcomingPosts.map((post:any, index:number) => {
                        return (
                          <div key={index} className="blog-posts-list-items-table-item">
                            <div className="blog-posts-list-items-table-item-data title">
                              <span>{post.title}</span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data date">
                              <span>{moment.unix(post.dateTimestamp).format('MM/DD/YYYY')}</span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data edit">
                              <Link href={`/dashboard/blog/edit-post/${post.id}`}>
                                <span>Edit</span>
                              </Link>
                              <span> {">"}</span>
                            </div>
                          </div>
                        )
                      }) : null
                    }
                  </div>
                </> :
                <div className="blog-posts-list-get-data-error">
                  <span>An error occurred.</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
}