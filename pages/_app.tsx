import "../styles/components/header.css"
import "../styles/components/footer.css"

// pages
import "../styles/pages/homepage.css"
import "../styles/pages/blog-post.css"
import "../styles/pages/post.css"
import "../styles/pages/contact.css"
import "../styles/pages/about.css"
import "../styles/pages/_error.css"
import "../styles/pages/login.css"

import ThemeProvider from "@/theme";
import React from "react";
import { Container } from "@mui/system";


export default function MyApp({ Component, pageProps}: any){
    return  (<ThemeProvider>
       <Container maxWidth="sm">
       <Component {...pageProps} />
       </Container>

          </ThemeProvider>)
  }