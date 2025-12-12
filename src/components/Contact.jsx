import React from 'react';
import '../App.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h3>Email</h3>
                <p>chinmaya@example.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h3>Phone</h3>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h3>Location</h3>
                <p>Remote / Available Worldwide</p>
              </div>
            </div>
          </div>
          
          <form className="contact-form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <input type="text" placeholder="Your Name" style={inputStyle} />
              <input type="email" placeholder="Your Email" style={inputStyle} />
            </div>
            <input type="text" placeholder="Subject" style={inputStyle} />
            <textarea placeholder="Your Message" rows="5" style={{...inputStyle, gridColumn: '1/-1'}}></textarea>
            <button type="submit" className="btn" style={{ marginTop: '20px' }}>
              Send Message
            </button>
          </form>
          
          <div className="social-links">
            <a href="https://github.com" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://twitter.com" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://aws.amazon.com" className="social-link">
              <i className="fab fa-aws"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '15px',
  border: '1px solid #e2e8f0',
  borderRadius: '5px',
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif'
};

export default Contact;