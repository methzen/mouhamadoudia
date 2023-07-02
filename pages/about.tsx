import { Component } from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import HeadMetadata from "../components/headMetadata"
import GoogleAnalytics from "../components/googleAnalytics"
import { Container } from "@mui/material"

export default class extends Component {
  render () {
    return (
      <Container maxWidth="md">
     <div className="layout-wrapper">
          <HeadMetadata
          title="Mouhamadou"
          metaDescription="Sofware Engineer"
            />
            <GoogleAnalytics />
        <Header />
        <div className="about-container">
          <div className="about-section">
            <h1>About Me</h1>
            <p>Mouhamadou Dia, engineer and PhD in applied mathematics.</p>
            <p>Since 2015, I have been helping tech companies implement numerical methods 
              and strategies that help them make better decisions and solve complexe and challenging industrial problems.</p>
            <p>I have worked with companies like General Electric, Alstom, EDF, Edvance...</p>
            <p>I started this website as a place to document everything I learned.</p>
          </div>

      <div className="about-section">
           <h2>The tools used to run this website </h2>
           <ul>
             <li><strong>Webiste</strong>: <a href="https://nextjs.org/">Next.js</a></li>
             <li><strong>Backend</strong>: <a href="https://nodejs.org/">Node.js</a></li>
             <li><strong>Database</strong>: <a href="https://www.mongodb.com/">MongoDB</a></li>
             <li><strong>Hosting </strong>: <a href="https://www.digitalocean.com/">DigitalOcean</a></li>
             <li><strong>Public repositories</strong>: <a href="https://github.com/methzen">Github</a></li>
           </ul>
         </div>

        </div>
        <Footer />
      </div>
      </Container>
 
    )
  }
}
