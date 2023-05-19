import { Component } from "react"
import moment from "moment"

import Header from "../../components/header"
import Footer from "../../components/footer"
import HeadMetadata from "../../components/headMetadata"
import getAllBlogPosts from "../../api/getAllBlogPosts"
import GoogleAnalytics from "../../components/googleAnalytics"
import { NextPageContext } from "next"

Blog.getInitialProps = async (ctx: NextPageContext) => {
    const apiResult = await getAllBlogPosts()
    return {
      posts: apiResult && apiResult.posts,
      getDataError: apiResult && apiResult.getDataError 
    }
  }
export default function Blog(props: any) {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Blog Posts "
          metaDescription="List of all blog posts published on the Mouhamadou Dia blog."
        />
        <GoogleAnalytics />
        <Header />
        <div className="blog-posts-container">
          <h1>Blog posts</h1>
          <div className="blog-posts-list">
          {
            props.posts && !props.getDataError ?
            props.posts.map((post:any, index:any) => {
            return (
            <a key={index} href={`/blog/${post.urlTitle}`}>
            <div className="blog-posts-list-item">
            <div className="blog-posts-list-item-title-and-date">
              <h2>{post.title}</h2>
              <div className="blog-posts-list-item-date">
                <span>{moment.unix(post.dateTimestamp).format("MMMM Do, YYYY")}</span>
              </div>
            </div>
            </div>
            </a>
              )
            }) : 
            <div className="blog-posts-get-data-error-msg">
            <span>An error occurred.</span>
          </div>
          }
          </div>
        </div>
        <Footer />
      </div>
    )
}