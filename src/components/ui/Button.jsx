import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS } from '../../constants/colors';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false, 
  type = 'button',
  fullWidth = false,
  className = '',
  as,
  to,
  ...props 
}) => {
  const baseStyles = {
    border: 'none',
    borderRadius: '25px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    ...props.style
  };

  const sizeStyles = {
    small: {
      padding: '8px 16px',
      fontSize: '14px'
    },
    medium: {
      padding: '12px 24px',
      fontSize: '16px'
    },
    large: {
      padding: '16px 32px',
      fontSize: '18px'
    }
  };

  const variantStyles = {
    primary: {
      background: GRADIENTS.primary,
      color: COLORS.white,
      '&:hover': {
        background: GRADIENTS.primaryHover,
        transform: 'translateY(-2px)'
      }
    },
    secondary: {
      background: COLORS.white,
      color: COLORS.primary,
      border: `2px solid ${COLORS.primary}`,
      '&:hover': {
        background: COLORS.secondaryLight
      }
    },
    outline: {
      background: 'transparent',
      color: COLORS.primary,
      border: `2px solid ${COLORS.primary}`,
      '&:hover': {
        background: COLORS.primary,
        color: COLORS.white
      }
    },
    ghost: {
      background: 'transparent',
      color: COLORS.primary,
      '&:hover': {
        background: COLORS.secondaryLight
      }
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  // If 'as' prop is provided and it's Link, render as Link
  if (as === Link && to) {
    return (
      <Link
        to={to}
        className={className}
        style={combinedStyles}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      style={combinedStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 