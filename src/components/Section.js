import React from 'react';
import '../App.css';
// import { Button } from './Button';
import './Section.css';
import { Link } from 'react-router-dom';
function Section() {
  return (
    <div className='section-container'>

      <video src='../videos/video-1.mp4' autoPlay loop muted />
      <h1>CREATE YOUR SOLUTION FOR YOUR RETIREMENT </h1>
      <p>With Finicial Web Advisor You Can Start Creating Your Blueprint To You Finicial Freedoom</p>
      <div className='section-btns'>
        <Link
          to='/register'
          className='btn--outline'

        >
          GET STARTED
        </Link>
      </div>
    </div>
  );
}

export default Section;