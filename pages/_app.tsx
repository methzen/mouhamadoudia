// import { ThemeSettings } from "@/components/settings";
import ThemeProvider from "@/theme";
import React from "react";


export default function MyApp({ Component, pageProps}: any){
    return  (<ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>)
  }