import moment from "moment"
import Head from 'next/head';
import Markdown from '../../components/markdown';
import Header from "../../components/header"
import Footer from "../../components/footer"
import HeadMetadata from "../../components/headMetadata"
import GoogleAnalytics from "../../components/googleAnalytics"

import getBlogPostByUrlTitle from "../../api/getBlogPostByUrlTitle"
import { CardContent } from "@mui/material"
import { NextPageContext } from "next"
import { PostProps } from "@/types/types";

Post.getInitialProps = async({ query }: NextPageContext)=>{
    const apiResult= await getBlogPostByUrlTitle(query.title)
    return {
      post : apiResult && apiResult.post ,
      getDataError: apiResult && apiResult.getDataError,
      notFoundError : apiResult && apiResult.notFoundError 
    }
  }

export default function Post (props: PostProps){
        const content = props.post.markdownContent
        return (
            <div className="layout-wrapper">
              <HeadMetadata
                title={props.post ? props.post.seoTitleTag : "Blog Post"}
                metaDescription={props.post && props.post.seoMetaDescription}
                />
                <GoogleAnalytics />
              <Header />
              <div className="blog-post-container">
                <div className="blog-post-body-content">
                {
                   props.post && !props.getDataError && !props.notFoundError ?
                   <>
                     <div className="blog-post-top-section">
                       <h1>{props.post.title}</h1>
                       <div className="blog-post-top-meta">
                         <span>{moment.unix(props.post.dateTimestamp).format("MMMM Do, YYYY")}</span>
                         {
                           props.post.tags.map((tag, index) => {
                             return (
                               <a
                                 className="blog-post-top-tag-btn"
                                 key={index}
                                 href={`/blog/tags/${tag}`}
                               >
                                 <span>{tag}</span>
                               </a>
                             )
                           })
                         }
                       </div>
                     </div>
                     <CardContent>
                     <Markdown children={content} />
                     </CardContent>
                     
                   </> : 
                    <div className="blog-post-get-data-error-msg">
                      {
                     props.notFoundError ?
                     <span>Blog post not found.</span> :
                     <span>An error occurred.</span>
                      }
                    </div>
                  }                
                </div>
              </div>
              <Footer />
            </div>
        )
}

// export default function Post(props: PostProps) {
//   const content = props.post.markdownContent
//   return (
//     <>
//       <Head>
//         <title> Extra Components: Markdown | Minimal UI</title>
//       </Head>
//       <Box
//         sx={{
//           pt: 6,
//           pb: 1,
//           bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
//         }}
//       >
//       </Box>
//       <Container sx={{ my: 10 }}>
//         <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
//           <Card>
//             <CardHeader title={props.post.title} sx={{ pb: 3 }} />
//             <Divider sx={{ borderStyle: 'dashed' }} />
//             <CardContent>
//               <Markdown children={content} />
//             </CardContent>
//           </Card>
//         </Stack>
//       </Container>
//     </>
//   );
// }