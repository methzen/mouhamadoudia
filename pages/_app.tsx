import "../styles/components/header.css"
import "../styles/components/footer.css"

import ThemeProvider from "@/theme";
import React from "react";


export default function MyApp({ Component, pageProps}: any){
    return  (<ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>)
  }