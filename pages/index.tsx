import { Box, Typography } from "@mui/material"
import Header from "../components/header"
import Footer from "../components/footer"
import HeadMetadata from "../components/headMetadata"
import getThreeNewestPosts from "../api/getThreeNewestPosts"
import GoogleAnalytics from "../components/googleAnalytics"
import { NextPageContext } from "next"
import { PostbyTag } from "@/types/types"

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
          metaDescription="I'm an engineer, software developer."
        />
        <GoogleAnalytics />
        <Header />
        <div className="homepage-container"> 
        <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "3xl", sm: "4xl", md: "5xl" },
          fontWeight: 800,
        }}
      >
        Hi, I'm Mouhamadou
      </Typography>
      <Typography
        sx={{
          fontSize: "lg",
          color: "gray.500",
          maxWidth: "54ch",
        }}
      >
        I'm a a passionate Fullstack Software Engineer proficient in Python and JavaScript. 
        I create robust and innovative web solutions to bring ideas to life. Let's build something amazing together!
      </Typography>
    </Box>
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