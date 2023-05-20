import { Component } from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import HeadMetadata from "../components/headMetadata"
import getThreeNewestPosts from "../api/getThreeNewestPosts"
import GoogleAnalytics from "../components/googleAnalytics"
import { NextPageContext } from "next"
import { PostbyTag } from "@/types/types"
import { Typography } from "@mui/material"

Home.getInitialProps = async (cxt: NextPageContext) =>{
  const apiResult = await getThreeNewestPosts()
  
  return {
    posts: apiResult && apiResult.posts
  }
}
export default function Home(props: PostbyTag) {

    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Mouhamadou Dia"
          metaDescription="I'm an engineer, software developer and data scientist"
        />
        <GoogleAnalytics />
        <Header />
        <div className="homepage-container"> 
        <Typography variant="h1" sx={{mb : 5}}>
        I help you build secure api-driven backend.
        </Typography>
        <Typography color="text.secondary" variant="h4">
        Hi, I'm a fullstack software engineer and I work with Python and JavaScript.
        </Typography>   
 
      <div className="used-tech__images">
      <div className="python">
          <img src="/python.svg" alt="python logo" />
        </div>
        <div className="react">
          <img src="/react.svg" alt="React logo" />
        </div>
        <div className="nodejs">
          <img src="/nodejs.svg" alt="nodejs logo" />
        </div>
      </div>
          <div className="homepage-latest-blog-posts">
            <h2>
              Latest Blog Posts
              <a className="homepage-latest-blog-posts-view-all" href="/blog">View all</a>
            </h2>
            <div className="homepage-latest-blog-posts-list">

            {
                props.posts ?
                props.posts.map((post, index) => {
                  return (
                    <a key={index} href={`/blog/${post.urlTitle}`}>
                      <div className="homepage-latest-blog-post">
                        <div className="homepage-latest-blog-post-title">
                          <h3>{post.title}</h3>
                        </div>
                      </div>
                    </a>
                  )
                }) : null
              }
            </div>
          </div>

        </div>
        <Footer />
      </div>
    )
}