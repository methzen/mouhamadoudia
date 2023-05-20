//layout
import "../styles/normalize.css"
import "../styles/layout.css"

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

//dashboard
import "../styles/dashboard/layout.css"
import "../styles/dashboard/components/header.css"
import "../styles/dashboard/components/sidebar.css"
import "../styles/dashboard/blog/index.css"
import "../styles/dashboard/blog/create-new-post.css"
import "../styles/dashboard/blog/edit.css"
import "../styles/dashboard/images/index.css"
import "../styles/dashboard/images/upload.css"
import "../styles/dashboard/images/edit.css"
import "../styles/dashboard/sitemap.css"
import "../styles/dashboard/change-password.css"
import "../styles/dashboard/_error.css"

// modals
import "../styles/dashboard/components/modals/delete-blog-post.css"
import "../styles/dashboard/components/modals/delete-image.css"
import ThemeProvider from "@/theme";
import React from "react";
import { Container } from "@mui/system";


export default function MyApp({ Component, pageProps}: any){
    return  (<ThemeProvider>
       <Component {...pageProps} />
          </ThemeProvider>)
  }