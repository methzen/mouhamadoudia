import moment from "moment"

import Header from "../../../components/header"
import Footer from "../../../components/footer"
import HeadMetadata from "../../../components/headMetadata"
import GoogleAnalytics from "../../../components/googleAnalytics"
import getBlogPostsByTag from "../../../api/getBlogPostsByTag"
import { NextPageContext } from "next"
import { PostbyTag } from "@/types/types"

Tag.getInitialProps = async ({ query }: NextPageContext)=>{
    const apiResult = await getBlogPostsByTag(query.tag)
    return {
        posts: apiResult && apiResult.posts,
        tag: query.tag,
        getDataError : apiResult && apiResult.getDataError
        }

}

export default function Tag(props: PostbyTag) {
        return (
            <div className="layout-wrapper">
                <HeadMetadata
                    title={`Blog posts tagged as "${props.tag}"`}
                    metaDescription={`All blog posts tagged as "${props.tag}".`}
                />
                <GoogleAnalytics />
                <Header />
                <div className="blog-posts-container">
                    <h1>Blog post tagged as <u>{props.tag}</u></h1>
                    <div className="blog-posts-list">
                    {
                        props.posts ?
                        props.posts.map((post, index) => {
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
                <Footer/>
            </div>
        )
}