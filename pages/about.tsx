import { Component } from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import HeadMetadata from "../components/headMetadata"
import GoogleAnalytics from "../components/googleAnalytics"

export default class extends Component {
  render () {
    return (
      <div className="layout-wrapper">
          <HeadMetadata
          title="About Me | Mouhamadou"
          metaDescription="Sofware Engineer"
            />
            <GoogleAnalytics />
        <Header />
        <div className="about-container">
          <div className="about-section">
            <h1>About Me</h1>
            <p>Mouhamadou Dia, engineer and PhD in applied mathematics.</p>
            <p>Since 2015, I have been helping technological companies implement numerical methods 
              and strategies that help them make better decisions and solve complexe and challenging industrial problems.</p>
            <p>I have worked with companies like General Electric, Alstom, EDF, Edvance...</p>
            <p>I started this website as a place to document everything I learned.</p>
          </div>
          <div className="homepage-projects">
            <h2>I used to do international presentations, here are the lastest...</h2>
            <div className="homepage-projects-list">
              <div className="homepage-project">
                <h3>
                  <a href="http://www.wccm2018.org/">
                    <div className="homepage-project-icon">🇺🇸</div>
                    <div className="homepage-project-title">New York</div>
                  </a>
                </h3>
                <p>World Congress of Computational Mechanics (WCCM).</p>
                <div className="homepage-project-btns">
                  <a className="homepage-project-view-btn" href="http://www.wccm2018.org/">View</a>
                </div>
              </div>
              <div className="homepage-project">
                <h3>
                  <a href="https://csma.asso.univ-lorraine.fr/congres-de-giens/">
                    <div className="homepage-project-icon">🇫🇷</div>
                    <div className="homepage-project-title">Giens </div>
                  </a>
                </h3>
                <p>Colloque National en Calcul des Structures (CSMA).</p>
                <div className="homepage-project-btns">
                  <a className="homepage-project-view-btn" href="https://csma.asso.univ-lorraine.fr/congres-de-giens/">View</a>
                </div>
              </div>
              <div className="homepage-project">
                <h3>
                  <a href="https://upcommons.upc.edu/handle/2117/181163">
                    <div className="homepage-project-icon">🇪🇸</div>
                    <div className="homepage-project-title">Barcelone</div>
                  </a>
                </h3>
                <p>International Conference on Computational Plasticity (COMPLAS).</p>
                <div className="homepage-project-btns">
                  <a className="homepage-project-view-btn" href="https://upcommons.upc.edu/handle/2117/181163">View</a>
                </div>
              </div>
            </div>
          </div>

      <div className="about-section">
           <h2>The tools used to run this website </h2>
           <ul>
             <li><strong>Webiste</strong>: <a href="https://nextjs.org/">Next.js</a></li>
             <li><strong>Backend</strong>: <a href="https://nodejs.org/">Node.js</a></li>
             <li><strong>Database</strong>: <a href="https://www.mongodb.com/">MongoDB</a></li>
             <li><strong>Hosting </strong>: <a href="https://www.digitalocean.com/">DigitalOcean</a></li>
             <li><strong>Syntax Highlighting</strong>: <a href="https://prismjs.com">PrismJS</a></li>
             <li><strong>Public repositories</strong>: <a href="https://github.com/methzen">Github</a></li>
           </ul>
         </div>

        </div>
        <Footer />
      </div>
    )
  }
}
