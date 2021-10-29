import React from 'react'
import Navbar from "../Navbar"

import TeamImage from "../../images/Team.jpg"
import "../pages/About.css"
function About() {
  return (
    < >
      <Navbar />


      <div className="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>Resize the browser window to see that this page is responsive by the way.</p>
      </div>

      <h2 style={{ textAlign: "center" }}>Our Team</h2>
      
      <div className="row">


        <div className="column">
          <div className="card">
            <img src={TeamImage} alt="Mike" style={{ width: "100%" }} />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={TeamImage} alt="Mike" style={{ width: "100%" }} />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={TeamImage} alt="Mike" style={{ width: "100%" }} />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>



      </div>
      
      <div className="row">

        <div className="column">
          <div className="card">
            <img src={TeamImage} alt="Mike" style={{ width: "100%" }} />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={TeamImage} alt="Mike" style={{ width: "100%" }} />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={TeamImage} alt="Mike" style={{ width: "100%" }} />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>



      </div>

    </>
  )
}

export default About
