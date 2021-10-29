/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'


function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the INVESTIC newsletter to receive our Updates
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <button className='btn--outline'>Subscribe</button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Development Team</h2>
            {['right'].map((placement) => (
              <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                  <Popover id={`popover-positioned-${placement}`}>
                    <Popover.Title as="h3">{`Stakeholder:`}</Popover.Title>
                    <Popover.Content>
                      Member Name
                    </Popover.Content>
                  </Popover>
                }
              >
                <button className='btn--outline'>Project Manager</button>
              </OverlayTrigger>
            ))}
            <br />
            {['right'].map((placement) => (
              <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                  <Popover id={`popover-positioned-${placement}`}>
                    <Popover.Title as="h3">{`Developers:`}</Popover.Title>
                    <Popover.Content>
                      <p>Member One</p>
                      <p>Member Two</p>
                      <p>Member Three</p>
                      <p>Member Four</p>
                    </Popover.Content>
                  </Popover>
                }
              >
                <button className='btn--outline'>Team</button>
              </OverlayTrigger>
            ))}
            <br />
            <a href='#' rel="noreferrer" target="_blank">Devlopment Company</a>
          </div>
        </div>
        <div className='footer-link-wrapper'>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <h3 className='social-logo'>
              INVESTIC © 2020
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Footer;