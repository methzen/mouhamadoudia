import { Component } from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import HeadMetadata from "../components/headMetadata"
import GoogleAnalytics from "../components/googleAnalytics"
import { Container } from "@mui/material"

export default function Contact() {
    return (
      <Container maxWidth="md">
      <div className="layout-wrapper">
        <HeadMetadata
          title="Contact | Mouhamadou"
          metaDescription="If you have any comments, ideas, critiques, or you just want to say hi, you can contact me via email or the links listed below."
        />
        <GoogleAnalytics />
        <Header />
        <div className="contact-container">
          <div className="contact-section">
            <h1>Contact</h1>
             <p>If you have any comments, ideas, critiques, or you just want to say hi, don’t hesitate to send me an email at <strong>diamohaminsa@gmail.com</strong>!</p>
          </div>
        </div>
        <Footer />
      </div>
      </Container>

    )

}
