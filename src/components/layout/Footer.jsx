import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../constants/data';
import { COLORS, GRADIENTS } from '../../constants/colors';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  const footerStyles = {
    background: GRADIENTS.secondary,
    padding: '60px 0 20px',
    marginTop: '80px',
    borderTop: `1px solid ${COLORS.border}`
  };

  const footerContentStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px'
  };

  const footerSectionStyles = {
    display: 'flex',
    flexDirection: 'column'
  };

  const footerTitleStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: '16px'
  };

  const footerHeadingStyles = {
    fontSize: '18px',
    fontWeight: 600,
    color: COLORS.primaryDark,
    marginBottom: '16px'
  };

  const footerDescriptionStyles = {
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    marginBottom: '20px'
  };

  const socialLinksStyles = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  };

  const socialLinkStyles = {
    color: COLORS.primary,
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.3s ease'
  };

  const footerLinksStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const footerLinkStyles = {
    color: COLORS.textSecondary,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    display: 'block',
    marginBottom: '12px'
  };

  const newsletterFormStyles = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  };

  const footerBottomStyles = {
    borderTop: `1px solid ${COLORS.border}`,
    marginTop: '40px',
    paddingTop: '20px'
  };

  const footerBottomContentStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  };

  const footerBottomTextStyles = {
    color: COLORS.textLight,
    fontSize: '14px'
  };

  const footerBottomLinksStyles = {
    display: 'flex',
    gap: '20px'
  };

  const footerBottomLinkStyles = {
    color: COLORS.textLight,
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease'
  };

  return (
    <footer style={footerStyles}>
      <div style={footerContentStyles}>
        <div style={footerSectionStyles}>
          <h3 style={footerTitleStyles}>HEART & HUES</h3>
          <p style={footerDescriptionStyles}>
            Creating meaningful connections through thoughtful gifts that speak from the heart.
          </p>
          <div style={socialLinksStyles}>
            {FOOTER_LINKS.social.map((link) => (
              <a key={link.name} href={link.path} style={socialLinkStyles}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        <div style={footerSectionStyles}>
          <h4 style={footerHeadingStyles}>Quick Links</h4>
          <ul style={footerLinksStyles}>
            {FOOTER_LINKS.quickLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} style={footerLinkStyles}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div style={footerSectionStyles}>
          <h4 style={footerHeadingStyles}>Customer Service</h4>
          <ul style={footerLinksStyles}>
            {FOOTER_LINKS.customerService.map((link) => (
              <li key={link.name}>
                <a href={link.path} style={footerLinkStyles}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div style={footerSectionStyles}>
          <h4 style={footerHeadingStyles}>Newsletter</h4>
          <p style={footerDescriptionStyles}>
            Stay updated with our latest gifts and special offers.
          </p>
          <form style={newsletterFormStyles} onSubmit={handleNewsletterSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              fullWidth
              required
            />
            <Button type="submit" size="small">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      
      <div style={footerBottomStyles}>
        <div style={footerBottomContentStyles}>
          <p style={footerBottomTextStyles}>&copy; 2024 Heart & Hues. All rights reserved.</p>
          <div style={footerBottomLinksStyles}>
            {FOOTER_LINKS.legal.map((link) => (
              <a key={link.name} href={link.path} style={footerBottomLinkStyles}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 